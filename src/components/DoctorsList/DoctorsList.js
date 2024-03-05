import React from 'react'
import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";


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
  const handleBookNow = (doctorId,doctorName) => {
    // Handle booking logic here
    console.log('Booking appointment with doctor ID:', doctorId);
    path("/bookingAppointment",{state:{doctorId:doctorId,doctorName:doctorName}});
  };
  if (isLoggedIn) {
    return (
      <React.Fragment>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <ul>
          {doctorsList.map((doctor) => (
            <li key={doctor.id}>
              <div>
                <h2>{doctor.fullName}</h2>
                <p>Specialization: {doctor.specialization}</p>
                <button onClick={() => handleBookNow(doctor.id,doctor.fullName)}>Book Now</button>
              </div>
            </li>
          ))}
        </ul>
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

export default DoctorsList