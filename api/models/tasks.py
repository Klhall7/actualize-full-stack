from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
from main import supabase #import initialized client

class Task(BaseModel):
    id: int
    user_id: int 
    status: str = Field(default="Not Started") #not started, in progress, completed
    title: str
    created_at: datetime = Field(default_factory=datetime.now)
    due_date: Optional[datetime] = None
    description: Optional[str] = None
    
async def get_tasks_by_user(user_id: int) -> List[Task]: 
    todo = await supabase.table("tasks").select("*").eq("user_id", user_id).execute()
    tasks = [Task(**task) for task in todo.get("data", [])]
    return tasks
#iterate through list of tasks in supabase table, returning a list of Pydantic models directly. should remove need to turn into dictionaries as FastAPI should auto serialize into json format