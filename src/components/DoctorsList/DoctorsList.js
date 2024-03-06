import React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from'./DoctorsList.module.css';

function DoctorsList() {
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const path = useNavigate();

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
    path("/bookingAppointment", { state: { doctorId: doctorId, doctorName: doctorName } });
  };

  if (isLoggedIn) {
    return (
      <React.Fragment>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="container">
            <div className="row">
              {doctorsList.map((doctor) => (
                <div key={doctor.id} className="col-md-4 mb-4">
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
