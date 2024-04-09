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
                              <Link to='/adminDashboard' state={props.userType}>List Of Users</Link>
                            </li>
                            <li>
                              <Link to='/adminAppointmentsList'  state={props.userType}>Appointments</Link>
                            </li>
                            <li>
                              <Link to='/cancelAppointmentList'>List of Cancel Requests</Link>
                            </li>
                            <li><Link to='/logout'>Logout</Link></li>
                          </ul>
                        </nav>
                      </div>
            </div>
          )
    }

    else if(props.userType.userType === 'doctor'){
        return (
            <div>
                 <div id={styles.NavBar}>
                        <nav>
                          <ul>
                            <li><Link to='/doctorDashboard' state={props.userType}>Appointments</Link></li>
                            <li><Link to='/doctorRecords' state={props.userType}>Records</Link></li>
                           <li><Link to="/doctorprofile" state={{user:props}}>Profile</Link></li>
                            <li><Link to='/logout'>Logout</Link></li>
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
                          <li><Link to="/patientDashboard" state={props.userType}>Appointments</Link></li>
                         <li><Link to="/doctorsList" state={{user:props.userType}}>Booking</Link></li>
                         <li><Link to="/records"  state={props.userType}>Records</Link></li>
                         <li><Link to="/profile" state={{user:props}}>Profile</Link></li>
                         <li><Link to='/logout'>Logout</Link></li>
                          </ul>
                        </nav>
                      </div>
            </div>
          )
    }
  
}

export default Navbar