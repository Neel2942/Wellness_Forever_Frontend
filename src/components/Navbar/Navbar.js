import React from 'react'
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"

function Navbar(props) {
    console.log("Navbar");
    console.log(props);
    if(props.userType ==='admin'){
        return (
            <div>
                 <div id={styles.NavBar}>
                        <nav>
                          <ul>
                            <li>
                              <Link to='/adminDashboard'>List Of Users</Link>
                            </li>
                            <li>
                              <Link to='/adminAppointmentsList'>Appointments</Link>
                            </li>
                            <li>
                              <Link to='/cancelAppointmentList'>List of Cancel Requests</Link>
                            </li>
                          </ul>
                        </nav>
                      </div>
            </div>
          )
    }

    else if(props.userType === 'doctor'){
        return (
            <div>
                 <div id={styles.NavBar}>
                        <nav>
                          <ul>
                            <li><Link to='/doctorDashboard'>Appointments</Link></li>
                            <li><Link to='/records'>Records</Link></li>
                            <li><Link to='/patientAppointments'>Patient's Appointments</Link></li>
                          </ul>
                        </nav>
                      </div>
            </div>
          )
    }
    else if(props.userType.userType === 'patient'){
        return (
            <div>
                 <div id={styles.NavBar}>
                        <nav>
                          <ul>
                          <li><Link to="/patientDashboard" state={{userType:props.userType.userType}}>Appointments</Link></li>
                         <li><Link to="/doctorsList" state={{user:props.userType}}>Booking</Link></li>
                         <li><Link to="/records">Records</Link></li>
                         <li><Link to="/profile" state={{user:props}}>Profile</Link></li>
                          </ul>
                        </nav>
                      </div>
            </div>
          )
    }
  
}

export default Navbar