import React,  { useState, useEffect } from 'react';
import { Link,useLocation} from 'react-router-dom';
import './PatientDashboard.css'
import Navbar from '../Navbar/Navbar';


function PatientDashboard() {

  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn,setisLoggedIn]=useState(true);
  const {state}=useLocation();
  console.log(state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/patientDashboard');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (result === "notLoggedIn") {
          setisLoggedIn(false);
        }
        setPatientData(result);
        setLoading(false);
        } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

if(isLoggedIn){
  return (
    <React.Fragment>
      {loading ? (
       <p>Loading...</p>
     ) : (
       <div>
           <h2>Patient Dashboard</h2>
           <div className="patientContainer">
               {/* <div id="pateintNavBar">
                 <nav>
                   <ul>
                     <li><Link to="/patientDashboard">Appointments</Link></li>
                     <li><Link to="/bookingAppointment">Booking</Link></li>
                     <li><Link to="/records">Records</Link></li>
                     <li><Link to="/profile">Profile</Link></li>
                   </ul>
                 </nav>
               </div> */}
          <Navbar  userType={state}></Navbar>
               <div id="patientData">
                   <table className="patient-custom-table">
                     <thead>
                       <tr>
                         <th className="patient-custom-column">No.</th>
                         <th className="patient-custom-column">Appointment With</th>
                         <th className="patient-custom-column">Date</th>
                         <th className="patient-custom-column">Time</th>
                         <th className="patient-custom-column">Status</th>
                         <th className="patient-custom-column">Option</th>
                       </tr>
                     </thead>
                     <tbody>
                     {patientData.map((item) => (
                         <tr className='patient-custom-rows' key={item._id}>
                           <td className="patient-custom-data">{item.no}</td>
                           <td className="patient-custom-data">{item.appointmentWith}</td>
                           <td className="patient-custom-data">{item.date}</td>
                           <td className="patient-custom-data">{item.time}</td>
                           <td className="patient-custom-data">{item.status}</td>
                           <td className="patient-custom-data">{item.option}</td>
                           
                         </tr>
                       ))}
                     </tbody>
                   </table>
                </div>
             </div>
         </div>
     )}
       
    </React.Fragment>
 )
}
else{
  return(
    <React.Fragment>
        <div>
        <p>Please log in to access the patient dashboard.</p>
        <Link to="/login">Login</Link>
      </div>
    </React.Fragment>
  )
 }
}

export default PatientDashboard