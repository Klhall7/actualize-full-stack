from fastapi import FastAPI
from supabase_db import create_supabase_client
from fastapi.middleware.cors import CORSMiddleware

from models.tasks import Task
from models.users import User

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


@app.post("/register")
def register_user(request: User):
    response = supabase.auth.sign_up({
        "email": request.email, 
        "password": request.password, 
    }) #redirects on frontend 
    return response

@app.post("/login")
def login_user(request: User):
    response = supabase.auth.sign_in_with_password({
            "email": request.email,
            "password": request.password,
        }) #redirects and status response checks on frontend
    return response
    
@app.post("/logout") 
def logout_user():
    response = supabase.auth.sign_out()
    return response
    #should already have jwt token to end current session
