function Timetable({ data }) {
//   const data = {
//     fixed_slots: {
//       A: {
//         A_1: [
//           { day: "Monday", start: "08:00", end: "08:50" },
//           { day: "Tuesday", start: "09:00", end: "09:50" },
//           { day: "Wednesday", start: "10:00", end: "10:50" },
//           { day: "Friday", start: "11:00", end: "11:50" },
//         ],
//       },
//     },
//     my_courses: [
//       {
//         slot: "A",
//         sub_slot: "A_1",
//         course_code: "EE2015",
//         course_name: "Digital Logic Design",
//       },
//     ],
//   };
  const get_courses = (day) => {
    let classes = [];

    (data?.my_courses || []).forEach((course) => {
        // Finding all slots for the course
      const schedule = data?.fixed_slots?.[course.slot]?.[course.sub_slot] || [];
        // Finding if class is there today
      const class_today = schedule.find((rule) => rule.day === day);

      if (class_today) {
        classes.push({
          course_code: course.course_code,
          course_name: course.course_name,
          start: class_today.start,
          end: class_today.end,
        });
      }
    });
    return classes.sort((a, b) => a.start.localeCompare(b.start));
  };

  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div
      className="grid-section"
      style={{ padding: "20px", fontFamily: "sans-serif" }}
    >
      <h2>My Schedule</h2>

      {/* Container for the days */}
      <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
        {weekdays.map((day) => {
          const courses_today = get_courses(day);

          return (
            <div
              key={day}
              style={{
                minWidth: "200px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <h3
                style={{ borderBottom: "2px solid #eee", paddingBottom: "5px" }}
              >
                {day}
              </h3>
              {courses_today.length === 0 ? (
                <p style={{ color: "gray", fontSize: "14px" }}>No classes</p>
              ) : (
                courses_today.map((c) => (
                  <div
                    key={c.course_code}
                    style={{
                      backgroundColor: "#e3f2fd",
                      padding: "10px",
                      margin: "10px 0",
                      borderRadius: "4px",
                    }}
                  >
                    <strong>{c.course_code}</strong>
                    <div style={{ fontSize: "12px", color: "#555" }}>
                      {c.start} - {c.end}
                    </div>
                    <div style={{ fontSize: "14px", marginTop: "5px" }}>
                      {c.course_name}
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timetable;
