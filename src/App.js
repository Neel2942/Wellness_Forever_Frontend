import React from 'react'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import PatientDashboard from './components/PatientDashboard/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';


function App() {
  
  return (

      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/patientDashboard" element={<PatientDashboard/>}/>
          <Route path="/doctorDashboard" element={<DoctorDashboard/>}/>
        </Routes>
      </Router>
   
  )
}

export default App