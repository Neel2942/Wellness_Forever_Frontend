import React from 'react'
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"

function Navbar(props) {
    console.log("Navbar");
    console.log(props);
    if(props.user.userType ==='admin'){
        return (
            <div>
                 <div id={styles.NavBar}>
                        <nav>
                          <ul>
                            <li>
                              <Link to='/adminDashboard' state={props.user}>List Of Users</Link>
                            </li>
                            <li>
                              <Link to='/adminAppointmentsList' state={props.user}>Appointments</Link>
                            </li>
                            <li>
                              <Link to='/cancelAppointmentList' state={props.user}>List of Cancel Requests</Link>
                            </li>
                            <li><Link to='/'>Logout</Link></li>
                          </ul>
                        </nav>
                      </div>
            </div>
          )
    }

    else if(props.user.userType === 'doctor'){
        return (
            <div>
                 <div id={styles.NavBar}>
                        <nav>
                          <ul>
                            <li><Link to='/doctorDashboard' state={props.user}>Appointments</Link></li>
                            <li><Link to='/doctorRecords' state={props.user}>Records</Link></li>
                           <li><Link to="/doctorProfile" state={props.user}>Profile</Link></li>
                            <li><Link to='/'>Logout</Link></li>
                          </ul>
                        </nav>
                      </div>
            </div>
          )
    }
    else if(props.user.userType === 'patient'){
        return (
            <div>
                 <div id={styles.NavBar}>
                        <nav>
                          <ul>
                          <li><Link to="/patientDashboard" state={props.user}>Appointments</Link></li>
                         <li><Link to="/doctorsList" state={props.user}>Booking</Link></li>
                         <li><Link to="/records"  state={props.user}>Records</Link></li>
                         <li><Link to="/profile" state={props.user}>Profile</Link></li>
                         <li><Link to='/'>Logout</Link></li>
                          </ul>
                        </nav>
                      </div>
            </div>
          )
    }
  
}

export default Navbar