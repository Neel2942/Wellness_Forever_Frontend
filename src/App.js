import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import PatientDashboard from './components/PatientDashboard/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import BookingAppointment from './components/BookingAppointment/BookingAppointment';
import CancelAppointment from './components/CancelAppointment/CancelAppointment';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DoctorsList from './components/DoctorsList/DoctorsList';
import Profile from './components/Profile/Profile';
import CancelAppointmentList from './components/CancelAppointmentList/CancelAppointmentList';
import AdminAppoitnmentList from './components/AdminAppoitnmentList/AdminAppoitnmentList';
import Logout from './components/Logout/Logout';
import DoctorProfile from './components/DoctorProfile/doctorprofile';
import Records from './components/Records/Records';
import DoctorsRecord from './components/DoctorsRecord/DoctorsRecord';

function App() {
  
  return (
   <>
    <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/patientDashboard" element={<PatientDashboard/>}/>
          <Route path="/doctorDashboard" element={<DoctorDashboard/>}/>
          <Route path="/adminDashboard" element={<AdminDashboard/>}/>
          <Route path="/bookingAppointment" element={<BookingAppointment/>}/>
          <Route path="/cancelAppointment" element={<CancelAppointment/>}/>
          <Route path="/header" element={<Header/>}/>
          <Route path="/footer" element={<Footer/>}/>
          <Route path="/doctorsList" element={<DoctorsList/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/doctorprofile" element={<DoctorProfile/>}/>
          <Route path="/cancelAppointmentList" element={<CancelAppointmentList/>}/>
          <Route path="/adminAppointmentsList" element={<AdminAppoitnmentList/>}/>
          <Route path="/doctorRecords" element={<DoctorsRecord/>}/>
          <Route path="/records" element={<Records/>}/>
          <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </Router>
      <Footer ></Footer>
      </>
  )
}

export default App