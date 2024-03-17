from typing import Optional, List
from pydantic import BaseModel


class Task(BaseModel): #no RLS
    title: str
    due_date: Optional[str] = None
    description: Optional[str] = None
    user_id: str  
    status_id: Optional[int] = 1 #foreign key to public db table status, default 1
    
class Status(BaseModel): #no RLS
    id: int #primary 
    


