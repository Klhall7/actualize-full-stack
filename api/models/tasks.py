from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime
from supabase_db import create_supabase_client #import initialized client

supabase = create_supabase_client()

class Task(BaseModel):
    id: int
    title: str
    due_date: Optional[datetime] = None
    description: Optional[str] = None
    user_id: int  
    # need to create status class model and status table in supabase update status column under tasks in supabase to relate to status table in supabase
    status: int
    
async def get_tasks_by_user(user_id: int) -> List[Task]: 
    tasks = await supabase.table("tasks").select("*").eq("user_id", user_id).execute()
    #query supabase to fetch tasks by given user id and return result as todo
    todo = [Task(**task) for task in tasks.get("data", [])]
    #iterate over tasks resp, return list of task objects in. No response should be empty
    return todo
    #FastAPI should be auto serialize into json format