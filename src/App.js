import React from 'react'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import PatientDashboard from './components/PatientDashboard/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import BookingAppointment from './components/BookingAppointment/BookingAppointment';
import CancelAppointment from './components/CancelAppointment/CancelAppointment';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


function App() {
  
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/patientDashboard" element={<PatientDashboard/>}/>
          <Route path="/doctorDashboard" element={<DoctorDashboard/>}/>
          <Route path="/adminDashboard" element={<AdminDashboard/>}/>
          <Route path="/bookingAppointment" element={<BookingAppointment/>}/>
          <Route path="/cancelAppointment" element={<CancelAppointment/>}/>
          <Route path="/header" element={<Header/>}/>
          <Route path="/footer" element={<Footer/>}/>
        </Routes>
      </Router>
  )
}

export default App