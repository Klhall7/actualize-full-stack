from pydantic import BaseModel


class Profile(BaseModel):
    id: int
    email: str
    username: str
    
#need to  to edit email that updates email value on auth for current user 
#need to add logic to add username to profile table for greeting user on homepage