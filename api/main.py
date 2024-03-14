from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
import jwt
from gotrue.errors import AuthApiError
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

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login") 

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, supabase.client.headers.get("Authorization"), algorithms=["HS256"])
        username = payload.get("sub")
        user = await supabase.auth.user(username)  # Retrieve user information directly
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return user
    except jwt.exceptions.DecodeError as e:
        raise HTTPException(status_code=401, detail="Invalid token format") 
    except Exception as e:  # Catch other potential errors
        raise HTTPException(status_code=500, detail="Internal server error")


@app.get("/")
def home():
    return{"message": "root route"}

@app.get("/get-user-data")
async def retrieve_user_data(current_user: dict = Depends(get_current_user)):
    user_data = current_user  # Access user information directly from the validated payload
    return {"user_data": user_data}

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
    
@app.post("/logout") 
def logout_user():
    response = supabase.auth.sign_out()
    return response
    #should already have jwt token to end current session
