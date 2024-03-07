import React,  { useState, useEffect } from 'react';
import { Link,useLocation} from 'react-router-dom';
import styles from './PatientDashboard.module.css'
import Navbar from '../Navbar/Navbar';


function PatientDashboard() {

  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn,setisLoggedIn] = useState(true);
  const [userType,setUserType] = useState("patient");
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
        }else{
          if(state.userType !== userType){
            setisLoggedIn(false);
          }
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
           <div className={styles.patientContainer}>
               <Navbar  userType={state}></Navbar>
               <div id={styles.patientData}>
                   <table className={styles.patient_custom_table}>
                     <thead>
                       <tr>
                         <th className={styles.patient_custom_column}>No.</th>
                         <th className={styles.patient_custom_column}>Appointment With</th>
                         <th className={styles.patient_custom_column}>Date</th>
                         <th className={styles.patient_custom_column}>Time</th>
                         <th className={styles.patient_custom_column}>Status</th>
                         <th className={styles.patient_custom_column}>Option</th>
                       </tr>
                     </thead>
                     <tbody>
                     {patientData.map((item) => (
                         <tr className={styles.patient_custom_rows} key={item._id}>
                           <td className={styles.patient_custom_data}>{item.no}</td>
                           <td className={styles.patient_custom_data}>{item.appointmentWith}</td>
                           <td className={styles.patient_custom_data}>{item.date}</td>
                           <td className={styles.patient_custom_data}>{item.time}</td>
                           <td className={styles.patient_custom_data}>{item.status}</td>
                           <td className={styles.patient_custom_data}><button id={styles.patient_cancel_button} type="submit">Cancel</button></td>
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