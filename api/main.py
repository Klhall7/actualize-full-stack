from fastapi import FastAPI, HTTPException, status, Request
from gotrue.errors import AuthApiError
from supabase_db import create_supabase_client
from fastapi.middleware.cors import CORSMiddleware

from models.tasks import Task
from models.users import User, Profile

app = FastAPI()

origins = [  
    "http://localhost:8000",
    "http://localhost:5173",
    "http://127.0.0.1:8000",
    "http://localhost:*/",
    "http://localhost/*",
]

app.add_middleware(  #handle cors for security
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase = create_supabase_client()

@app.get("/")
def home():
    return{"message": "root route"}

def handle_exception(e):
    if isinstance(e, AuthApiError): #custom based on AuthApiError
        if "User already registered" in str(e): 
            error_code = status.HTTP_409_CONFLICT  
            error_detail = "Already Registered"
        elif "Invalid Refresh Token: Already Used" in str(e):
            error_code = status.HTTP_409_CONFLICT 
            error_detail = "Refresh Token Already Used. Redirect"   
        elif "Invalid login credentials" in str(e):
            error_code = status.HTTP_401_UNAUTHORIZED  
            error_detail = "Invalid Credentials" 
        else:
            error_code = status.HTTP_401_UNAUTHORIZED  
            error_detail = "Authentication Failed"  
    else: #any not AuthApiError
        error_code = status.HTTP_500_INTERNAL_SERVER_ERROR  
        error_detail = f"Error Processing Fetch Request: {str(e)}" 

    raise HTTPException(
        status_code=error_code,
        detail=error_detail
    )
    
@app.post("/register")
def register_user(request: User):
    try:
        response = supabase.auth.sign_up({
        "email": request.email, 
        "password": request.password, 
    }) #redirects on frontend 

    except Exception as e:
        handle_exception(e)
    
    return response

@app.post("/login")
def login_user(request: User):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": request.email,
            "password": request.password,
        }) #redirects on frontend
    except Exception as e:
        handle_exception(e)
    return response
    
@app.get("/logout") 
def logout_user(): 
    """reads jwt from client storage to sign a user out, frontend handles success"""
    try:
        response = supabase.auth.sign_out()
        
    except Exception as e:
        handle_exception(e)
    return response
    
    
@app.get("/profile/{id}") 
async def get_profile_by_id(id: str):
    """Retrieves profile for current user - json object"""
    try:
        profile_data = supabase.table("profile").select("*").eq("id", id).execute()
    except Exception as e:
        handle_exception(e)
    return profile_data

@app.put("/update-profile/{id}") #must pass access token for authorization
async def update_profile(id: str, update: Profile): 
    """accesses existing profile with uuid, sends specified changes and returns updated profile.
    supabase security setting blocks changes to auth.users table, until that is worked out only allow user to adjust columns that are not associated with auth table to mitigate email/pass mismatch"""
    try:
        existing_profile = supabase.table('profile').select('username').eq('id', id).single()
        
        update_data = { #check if field is updated before processing
            "username": update.username if update.username else existing_profile['username'],
        }
        profile_updated = supabase.table('profile').update(update_data).eq("id", id).execute()
        
    except Exception as e:
        raise Exception( {"error": f"An error occurred while updating your profile data: {str(e)}. Please try again, and contact us if the issue persists."})
    
    return profile_updated

@app.post("/add-task")
async def add_task(insert: Task):
    """adds a new task into the tasks db"""
    print(insert)
    try:
        new_task = supabase.table('tasks').insert({
            "title": insert.title,
            "due_date": insert.due_date if insert.due_date else None,
            "description": insert.description,
            "user_id": insert.user_id, #set to "loginId" from server storage
            "status_id": insert.status_id #default 1 at creation restrict vals on front
        }).execute()    
    except Exception as e:
        raise Exception({"error": f"An error occurred while adding the task: {str(e)}. Please check that you have a valid entry and try again. If the issue persists contact us with a screenshot so we can work on fixing it"})  
    return new_task

@app.get("/tasks/user/{user_id}")
async def get_user_tasks(user_id: str):
    """Retrieves all tasks created by a specific user_id.- json type object"""
    try:
        user_tasks = supabase.table("tasks").select("*").eq("user_id", user_id).execute()   
    except Exception as e:
        handle_exception(e)
    return user_tasks

@app.get("/tasks/status/{user_id}")
async def get_tasks_status_count(user_id: str):
    """Retrieves json object of user's task then counts status occurrences. Number Key will be converted to text on the front end(not started, in progress, complete, etc)"""
    try:
        tasks_query = supabase.table("tasks").select("status_id").eq("user_id", user_id).execute()
        tasks = tasks_query.data
        status_counts = {}
        for task in tasks:
            status_id = task["status_id"]
            status_counts[status_id] = status_counts.get(status_id, 0) + 1
        return status_counts

    except Exception as e:
        handle_exception(e)
    
@app.put("/update-task/{id}") #fetch upon save button
async def update_task(id: int, update: Task): 
    """Updates an existing task by it's task id and returns it"""
    try:
        task_updated = supabase.table('tasks').update({ 
            "title": update.title,
            "due_date": update.due_date if update.due_date else None,
            "description": update.description,
            "status_id": update.status_id #dropdown of controlled values
        }).eq("id", id).execute()
        return task_updated
    except Exception as e:
        return {"error": f"An error occurred while updating the task: {str(e)}. Please try again, and contact us if the issue persists."}
    
@app.delete("/delete-task/{id}") #will delete with button, make sure to have user confirm
async def delete_task(id: int): 
    """deletes an existing task by it's task db id"""
    try:
        supabase.table('tasks').delete().eq("id", id).execute()
        return {'message': "task deleted successfully"}
    except Exception as e:
        return {"error": f"An error occurred deleting the task: {str(e)}. Please try again, and contact us if the issue persists."}

@app.post("/refresh")
async def refresh_token(request: Request):
    """processes request to refresh a session in case a user's token expired"""
    data = await request.json()
    token = data.get('refresh_token')

    try:
        session = supabase.auth.refresh_session(token)
        if session is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid session",
            )
        return session
    except Exception as e:
        handle_exception(e)




