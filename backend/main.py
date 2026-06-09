import json
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import HTTPException

app = FastAPI()

#React App URL
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       
    allow_credentials=True,      
    allow_methods=["*"],         
    allow_headers=["*"],        
)

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

#POST API to add a new course
@app.post("/addcourse")
def add_course(new_course : Course):
    if not os.path.exists(db):
        raise HTTPException(status_code=500, detail="Database file not found.")

    with open(db, 'r') as file:
        data = json.load(file)

    fixed_slots = data.get("fixed_slots", {})
    if new_course.slot not in fixed_slots or new_course.sub_slot not in fixed_slots[new_course.slot]:
        raise HTTPException(status_code=404, detail="Invalid slot selected.")
        
    new_slot_timings = fixed_slots[new_course.slot][new_course.sub_slot]

    for current_course in data.get("my_courses", []):
        current_slot = current_course['slot']
        current_subslot = current_course['sub_slot']
        current_timing = fixed_slots[current_slot][current_subslot]


        #Clash Detection Logic
        for new in new_slot_timings:
            for ext in current_timing:
                if new['day'] == ext['day']:
                    if new['start'] == ext['start'] or new['end'] == ext['end']:
                        raise HTTPException(status_code=400, detail="Clashing in Courses Detected")
                        

    #Add new course if no error raised
    data['my_courses'].append(new_course.model_dump())

    with open(db, 'w') as file:
        json.dump(data, file, indent = 4)

    return {"message": f"Successfully added {new_course.course_code} to {new_course.sub_slot}!"}
