from fastapi import FastAPI
from supabase_db import create_supabase_client
from fastapi.middleware.cors import CORSMiddleware

import bcrypt
from typing import Union

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

@app.post('/register', response_model=User)
def register_user(email: str, password: str, name: str):
    response = supabase.auth.sign_up({
        "email": email, 
        "password": password, 
        "options":{
            "data": {
                "display_name": name
            }
        } 
    })
    return User(email=email, password=password, name=name)

def user_exists(key: str = "email", value: str = None):
    user = supabase.from_("users").select("*").eq(key, value).execute()
    return len(user.data) > 0

# Create a new user
@app.post("/user")
def create_user(user: User):
    try:
        # Convert email to lowercase
        user_email = user.email.lower()
        # Hash password
        hashed_password = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt()).decode()

        # Check if user already exists
        if user_exists(value=user_email):
            return {"message": "User already exists"}

        # Add user to users table
        user = supabase.from_("users")\
            .insert({"email": user_email, "password": hashed_password, "name": user.name})\
            .execute()

        # Check if user was added
        if user:
            return {"message": "User created successfully"}
        else:
            return {"message": "User creation failed"}
    except Exception as e:
        print("Error: ", e)
        return {"message": "User creation failed"}

# Retrieve a user
@app.get("/user")
def get_user(user_id: Union[str, None] = None):
    try:
        if user_id:
            user = supabase.from_("users")\
                .select("id", "email", "name")\
                .eq("id", user_id)\
                .execute()

            if user:
                return user
        else:
            users = supabase.from_("users")\
                .select("id", "email", "name")\
                .execute()
            if users:
                return users
    except Exception as e:
        print(f"Error: {e}")
        return {"message": "User not found"}
