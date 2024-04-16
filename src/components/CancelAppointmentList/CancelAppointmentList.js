import React, { useState, useEffect }  from 'react'
import styles from './CancelAppointmentList.module.css'
import Navbar from '../Navbar/Navbar';
import { Link, useNavigate, useLocation  } from "react-router-dom";
import AuthLoginComponent from '../AuthLoginComponent/AuthLoginComponent';

function CancelAppointmentList() {
    const [cancelList, setCancelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const { state } = useLocation();
  const path = useNavigate();
  const backendUrl = process.env.BACKEND_API || "https://wellnessforever.onrender.com";
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/cancelAppoinmentList`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (result === "notLoggedIn") {
          setisLoggedIn(false);
        }
        setCancelList(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const handleViewCancelList = (cancelId, cancelDetails) => {
    // Handle booking logic here
    path("/cancelAppointment", { state: { cancelId: cancelId, cancelDetails: cancelDetails } });
  };


  if (isLoggedIn) {
    return (
      <React.Fragment>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="container-fluid ">
            <div className="row">
              <div className="col-2">
                <Navbar user={state} />
              </div>
              <div className="col">
              {cancelList.length == 0 ? (
                            <h4 className={styles.noAppoitnment}> No Cancel Lists to display</h4>
                     ) : (
                <div>
                {cancelList.map((list,index) => (
                  <div key={list.cancelAppointmentId} className="col mb-4 ">
                    <div className={styles.doctor_card}>
                      <h3>{list.doctorName}</h3>
                      <p className={styles.specialization}>Date: {list.date}</p>
                      <p className={styles.description}>Time: {list.time}</p>
                      <button className="btn btn-primary" onClick={() => handleViewCancelList(list.cancelAppointmentId, cancelList[index])}>View Details</button>
                    </div>
                  </div>
                ))}
                </div> )}
                
              </div>
            </div>
            </div>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <AuthLoginComponent user="Admin"></AuthLoginComponent>
    );
  }
}

export default CancelAppointmentList