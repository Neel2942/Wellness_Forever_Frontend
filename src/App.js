import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
// NavBar
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// Auth
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Logout from './components/Logout/Logout';
// Patient
import PatientDashboard from './components/PatientDashboard/PatientDashboard';
import DoctorsList from './components/DoctorsList/DoctorsList';
import BookingAppointment from './components/BookingAppointment/BookingAppointment';
import Records from './components/Records/Records';
import Profile from './components/Profile/Profile';
// Doctor
import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard';
import DoctorProfile from './components/DoctorProfile/doctorprofile';
import DoctorsRecord from './components/DoctorsRecord/DoctorsRecord';
// Admin
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminAppoitnmentList from './components/AdminAppoitnmentList/AdminAppoitnmentList';
import CancelAppointment from './components/CancelAppointment/CancelAppointment';
import CancelAppointmentList from './components/CancelAppointmentList/CancelAppointmentList';
import PageNotFound from './components/PageNotFound/PageNotFound';

function App() {
  
  return (
   <>
    <Header/>
      <Router>
        <Routes>
        {/* ----------------------Auth---------------------- */}
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/logout" element={<Logout/>}/>
        {/* ----------------------Patient---------------------- */}
          <Route path="/patientDashboard" element={<PatientDashboard/>}/>
          <Route path="/doctorsList" element={<DoctorsList/>}/>
          <Route path="/bookingAppointment" element={<BookingAppointment/>}/>
          <Route path="/records" element={<Records/>}/>
          <Route path="/profile" element={<Profile/>}/>
        {/* ----------------------Doctor---------------------- */}
          <Route path="/doctorDashboard" element={<DoctorDashboard/>}/>
          <Route path="/doctorRecords" element={<DoctorsRecord/>}/>
          <Route path="/doctorprofile" element={<DoctorProfile/>}/>
        {/* ----------------------Admin---------------------- */}
          <Route path="/adminDashboard" element={<AdminDashboard/>}/>
          <Route path="/adminAppointmentsList" element={<AdminAppoitnmentList/>}/>
          <Route path="/cancelAppointmentList" element={<CancelAppointmentList/>}/>
          <Route path="/cancelAppointment" element={<CancelAppointment/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </Router>
      <Footer />
      </>
  )
}

export default App