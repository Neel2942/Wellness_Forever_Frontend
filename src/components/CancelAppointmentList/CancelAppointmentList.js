import React, { useState, useEffect }  from 'react'
import styles from './CancelAppointmentList.module.css'
import Navbar from '../Navbar/Navbar';
import { Link, useNavigate, useLocation  } from "react-router-dom";

function CancelAppointmentList() {
    const [cancelList, setCancelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const path = useNavigate();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/cancelAppoinmentList");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (result === "notLoggedIn") {
          setisLoggedIn(false);
        }
        console.log(result);
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
    console.log('Cancel Details:', cancelDetails);
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
                <Navbar userType="admin" />
              </div>
              <div className="col">
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
              </div>
            </div>
            </div>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div>
          <p>Please log in to access the dashboard.</p>
          <Link to='/login'>Login</Link>
        </div>
      </React.Fragment>
    );
  }
}

export default CancelAppointmentList