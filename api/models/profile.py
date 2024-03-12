from pydantic import BaseModel


class Profile(BaseModel):
    id: int
    email: str
    password: str
    username: str
    
#need to add function logic to display specific data from auth table for user frontend profile page 
#need to add logic to edit email that updates email value on auth for current user 
#need to add logic to add username to profile table for greeting user on homepage