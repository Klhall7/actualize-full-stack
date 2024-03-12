from pydantic import BaseModel

class User(BaseModel):
    email: str
    password: str
    
#model exists for frontend to talk to fastapi 