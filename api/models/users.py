from pydantic import BaseModel

class User(BaseModel):
    email: str
    password: str
    
class UserBaseSchema(BaseModel):
    email: str
#only want to call user info that isn't protected

class UserSchema(UserBaseSchema):
    id: int
#calls id & email
    class Config: 
        populate_by_name = True