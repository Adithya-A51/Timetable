import json
import os
from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()

db = "timetable.json"

class Course(BaseModel):
    slot: str
    sub_slot: str
    course_code: str
    course_name : str

#GET API to obtain already existing slots and all slots
@app.get("/timetable")
def get_timetable():
    if not os.path.exists(db):
        return {"fixed_slots": {}, "my_courses": []}
    
    with open(db, 'r') as file:
        data = json.load(file)
    
    return data

