import './App.css'
import Timetable from './components/timetable'
import AddCourse from './components/addcourse'

function App() {

  return (
  <div className="app-container">
    <h1>Timetable Generator</h1>
    
    <div className="layout-split">
      {/* We drop our Lego blocks right here */}
      <AddCourse />
      <Timetable />
    </div>
  </div>
  );
  
}

export default App;
