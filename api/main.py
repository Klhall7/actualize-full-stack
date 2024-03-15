from fastapi import FastAPI, HTTPException, status, Depends
from gotrue.errors import AuthApiError
from supabase_db import create_supabase_client
from fastapi.middleware.cors import CORSMiddleware

from models.tasks import Task, get_tasks_by_user, get_task_by_id, get_status_by_id
from models.users import User, Profile, get_profile_by_id

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
        elif "Invalid login credentials" in str(e):
            error_code = status.HTTP_401_UNAUTHORIZED  
            error_detail = "Invalid Credentials" 
        else:
            error_code = status.HTTP_401_UNAUTHORIZED  
            error_detail = "Authentication Failed"  
    else: #any not AuthApiError
        error_code = status.HTTP_500_INTERNAL_SERVER_ERROR  
        error_detail = "Error Processing Auth Request" 

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
    response = supabase.auth.sign_out()
    return response
    #reads jwt from server storage

@app.get("/profile")
async def get_profile(profile_id: int = Depends(get_profile_by_id)):
    """Retrieves profile for current user using imported function.- json type"""
    return profile_id  # successful response should be json

@app.get("/tasks/user/{user_id}")
async def get_user_tasks(user_id: int = Depends(get_tasks_by_user)):
    """Retrieves all tasks created by a specific user_id.- json type object"""
    return user_id #set to "loginId" from server storage 

@app.get("/tasks/{task_id}")
async def get_task_by_id(task_id: int = Depends(get_task_by_id)):
    """Retrieves a task by its ID.- json type object"""
    return task_id  

@app.get("/statuses/{status_id}")
async def get_status_by_id(status_id: int = Depends(get_status_by_id)):
    """Retrieves a status by its ID number, which will be converted to a text value on the frontend (not started, in progress, complete, etc).- json type object"""
    return status_id 


@app.post("/addtask")
async def add_task(insert: Task):
    """adds a new task into the tasks db"""
    print(insert)
    new_task = supabase.table('tasks').insert({
        "title": insert.title,
        "due_date": insert.due_date.isoformat() if insert.due_date else None,  
        # make compatible with Supabase's timestamptz type.
        "description": insert.description,
        "user_id": insert.user_id, #set to "loginId" from server storage 
        "status": insert.status_id #default 1 at creation
    }).execute()
    return new_task