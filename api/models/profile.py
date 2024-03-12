from pydantic import BaseModel


class Profile(BaseModel):
    id: int
    email: str
    password: str
    username: str
    
## need to adc function to display data from auth table 