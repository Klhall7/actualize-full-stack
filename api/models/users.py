from pydantic import BaseModel
class User(BaseModel): #auth.users, no RLS
    email: str
    password: str
    
#model exists for frontend to talk to fastapi 

class Profile(BaseModel): #extension of supabase.auth.users table, RLS 
    id: str #primary, RLS creates by new account trigger
    email: str
    password: str
    username: str

