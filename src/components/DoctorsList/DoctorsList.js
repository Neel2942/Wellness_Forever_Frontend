import React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import styles from'./DoctorsList.module.css';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';

function DoctorsList() {
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const path = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  console.log("DoctorList");
  console.log(user);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/doctorsList");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (result === "notLoggedIn") {
          setisLoggedIn(false);
        }
        setDoctorsList(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBookNow = (doctorId, doctorName) => {
    // Handle booking logic here
    console.log('Booking appointment with doctor ID:', doctorId);
    path("/bookingAppointment", { state: { doctorId: doctorId, doctorName: doctorName,state:user } });
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
                <Navbar userType={user} />
              </div>
              <div className="col">
                {doctorsList.map((doctor) => (
                  <div key={doctor.id} className="col mb-4 ">
                    <div className={styles.doctor_card}>
                      <h2>{doctor.fullName}</h2>
                      <p className={styles.specialization}>Specialization: {doctor.specialization}</p>
                      <p className={styles.description}>Description: {doctor.description}</p>
                      <button className="btn btn-primary" onClick={() => handleBookNow(doctor.id, doctor.fullName)}>Book Now</button>
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

export default DoctorsList;
