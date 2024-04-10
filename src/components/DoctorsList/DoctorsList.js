import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function DoctorsList() {
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const path = useNavigate();
  const { state } = useLocation();

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
    path("/bookingAppointment", {
      state: { doctorId: doctorId, doctorName: doctorName, state: state },
    });
  };

  if (isLoggedIn) {
    return (
      <React.Fragment>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="d-flex row-3">
            <Navbar user={state} />
            
            <div className="d-flex flex-wrap flex-grow-1">
              {doctorsList.map((doctor) => (
                <div class="m-4 h-30 w-25 ">
                  <div class="card" style={{ minHeight: "100%" }}>
                    <div class="card-body">
                      <h2 class="card-title">{doctor.fullName}</h2>
                      <p class="card-text">
                        Specialization: {doctor.specialization}
                      </p>
                      <p class="card-text">Description: {doctor.description}</p>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() =>
                          handleBookNow(doctor.id, doctor.fullName)
                        }
                      >
                        Book Now
                      </button>
                    </div>
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
          <p>Please log in to access the doctor list.</p>
          <Link to="/">Login</Link>
        </div>
      </React.Fragment>
    );
  }
}

export default DoctorsList;
