import json

db = "timetable.json"

with open(db, 'r') as file:
    data = json.load(file)

my_courses = data.get("my_courses", [])

print(len(my_courses))