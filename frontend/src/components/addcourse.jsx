import { useState } from "react";

function AddCourse({ fixed_slots, onAddCourse }) {

    // const fixed_slots = {
    //     "A": { "A_1": [], "A_2": [] },
    //     "B": { "B_1": [], "B_2": [] },
    //     "C": { "C_1": [], "C_2": [] }
    // };

    const [CourseCode, setCourseCode] = useState("");
    const [CourseName, setCourseName] = useState("");
    const [CourseSlot, setCourseSlot] = useState("");
    const [CourseSubslot, setCourseSubslot] = useState("");


    const slots = Object.keys(fixed_slots || {});

    const subslots = CourseSlot ? Object.keys(fixed_slots[CourseSlot] || {}) : [];

    const submit_course = async(e) =>{
        e.preventDefault();

        const new_course = {
            slot: CourseSlot,
            sub_slot: CourseSubslot,
            course_code: CourseCode,
            course_name: CourseName
        };

    const success = await onAddCourse(new_course);

    if (success) {
      setCourseCode('');
      setCourseName('');
      setCourseSlot('');
      setCourseSubslot('');
    }
    };

   return (
    <div className="form-section" style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "400px", fontFamily: "sans-serif" }}>
      <h2>Add a New Course</h2>
      
      <form onSubmit={submit_course} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

        {/* Text Inputs */}
        <div>
          <label>Course Code:</label><br />
          <input 
            type="text" 
            required 
            value={CourseCode} 
            onChange={(e) => setCourseCode(e.target.value)} 
            placeholder="e.g. EE2015" 
            style={{ width: "100%", padding: "8px" }} 
          />
        </div>

        <div>
          <label>Course Name:</label><br />
          <input 
            type="text" 
            required 
            value={CourseName} 
            onChange={(e) => setCourseName(e.target.value)} 
            placeholder="e.g. Electrical Circuits and Networks" 
            style={{ width: "100%", padding: "8px" }} 
          />
        </div>

        {/* Dropdown 1: The Main Group */}
        <div>
          <label>Slot:</label><br />
          <select 
            required 
            value={CourseSlot} 
            // When this changes, update the group AND clear the sub-slot!
            onChange={(e) => { 
              setCourseSlot(e.target.value); 
              setCourseSubslot(''); 
            }} 
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">-- Select a Slot --</option>
            {slots.map(slot => (
              <option key={slot} value={slot}>Slot {slot}</option>
            ))}
          </select>
        </div>

        {/* Dropdown 2: The Dynamic Sub-Slot */}
        <div>
          <label>Sub Slot:</label><br />
          <select 
            required 
            disabled={!CourseSlot} // Locks the dropdown if no group is picked
            value={CourseSubslot} 
            onChange={(e) => setCourseSubslot(e.target.value)} 
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">-- Select a Sub-Slot --</option>
            {subslots.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Add to Timetable
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
