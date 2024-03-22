from typing import Optional
from pydantic import BaseModel


class Task(BaseModel): #no RLS
    title: str
    due_date: Optional[str] = None
    purpose_description: Optional[str] = None
    user_id: str  
    status_id: Optional[int] = 1 #foreign key to public db table status, default 1
    completion_count: Optional[int] = 0
    achievement_steps: Optional[str] = None
    category: str
    
    
class Status(BaseModel): #no RLS
    id: int #primary 
    


