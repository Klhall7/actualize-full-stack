from fastapi import FastAPI, HTTPException
from supabase_db import create_supabase_client
from fastapi.middleware.cors import CORSMiddleware

from models.tasks import Task
from models.users import User

app = FastAPI()

origins = [
    "http://localhost/*",
    "http://127.0.0.1:8000",
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

@app.post('/register')
def register_user(request: User):
    response = supabase.auth.sign_up({
        "email": request.email, 
        "password": request.password, 
    })
    return response

@app.post("/login")
def login_user(request: User):
    response = supabase.auth.sign_in_with_password({
            "email": request.email,
            "password": request.password,
        })
        
    return response
    
    #     response_object = response()
            # status_code = response_object.status_code
        
        
    #     if status_code == 200:
    #         return response
        
    #     # Check if the error is due to invalid credentials
    #     if status_code == 401:
    #         raise HTTPException(status_code=401, detail="Invalid credentials")
    #     else:
    #         raise HTTPException(status_code=status_code, detail="Unexpected Error")
            
    # except Exception as e:
    #     # If an exception occurs, return HTTP 500 with the exception message
    #     raise HTTPException(status_code=500, detail=str(e))
    

@app.post("/logout")
def logout_user():
    response = supabase.auth.sign_out()
    #may need to check current user first
    return response
    
    