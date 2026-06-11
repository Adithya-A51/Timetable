import "./App.css";
import Timetable from "./components/timetable";
import AddCourse from "./components/addcourse";
import { useState, useEffect } from "react";

function App() {
  const [ timetable, setTimetable ] = useState({
    fixed_slots: {},
    my_courses: [],
  });
  const [errormessage, setError ] = useState("");

  // Getting the timetable data with fetch

  const fetch_timetable = async () => {
    try {
      const response = await fetch("http://localhost:8000/timetable");
      if (!response.ok) throw new Error("Failed to fetch timetable");

      const data = await response.json();
      setTimetable(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Could not connect to the backend server.");
    }
  };

  useEffect(() => {
    const loadTimetable = async () => {
      await fetch_timetable();
    };

    loadTimetable();
  }, []);

  // Adding the courses with POST API
  const handleAddCourse = async (new_course) => {
    setError('');

    try {
      const response = await fetch("http://localhost:8000/addcourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(new_course), 
      });
       const result = await response.json();

      if (!response.ok) {
        setError(result.detail || "An error occurred while adding the course.");
        return false; 
      }

      await fetch_timetable();
      return true;
    }
      catch (error) {
      console.error("Network error:", error);
      setError("Network error: Make sure your FastAPI server is running!");
      return false;
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", fontFamily: "sans-serif" }}>My Timetable</h1>
      
      {/* If there's an error (like a clash), display a red alert box */}
      {errormessage && (
        <div style={{ backgroundColor: "#ffebee", color: "#c62828", padding: "15px", borderRadius: "8px", marginBottom: "20px", fontWeight: "bold" }}>
          ⚠️ {errormessage}
        </div>
      )}
      
      <div className="layout-split" style={{ display: "flex", gap: "30px", alignItems: "flex-start" }}>
        
        {/* Pass the fixed_slots and the POST function DOWN to the form via 'Props' */}
        <div style={{ flex: "1" }}>
          <AddCourse
            fixed_slots={timetable.fixed_slots}
            onAddCourse={handleAddCourse}
          />
        </div>

        {/* Pass the entire timetable DOWN to the grid so it can draw it */}
        <div style={{ flex: "2" }}>
          <Timetable data={timetable} />
        </div>

      </div>
    </div>
  );
}

export default App;
