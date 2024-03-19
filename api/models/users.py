from pydantic import BaseModel
from typing import Optional
class User(BaseModel): #auth.users, no RLS
    email: str
    password: str
    
#model exists for frontend to talk to fastapi 

class Profile(BaseModel): #extension of supabase.auth.users table, RLS 
    email: Optional[str]
    password: Optional[str] 
    username: Optional[str]

