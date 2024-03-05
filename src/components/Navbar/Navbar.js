import React from 'react'
import { Link } from "react-router-dom";

function Navbar(props) {
    console.log("Navbar");
    console.log(props);
    if(props.userType ==='admin'){
        return (
            <div>
                 <div id='adminNavBar'>
                        <nav>
                          <ul>
                            <li>
                              <Link to='/adminDashboard'>List Of Users</Link>
                            </li>
                            <li>
                              <Link to='/doctorAppointments'>
                                Doctor's Appointments
                              </Link>
                            </li>
                            <li>
                              <Link to='/patientAppointments'>
                                Patient's Appointments
                              </Link>
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
                 <div id='adminNavBar'>
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
    else if(props.userType === 'patient'){
        return (
            <div>
                 <div id='adminNavBar'>
                        <nav>
                          <ul>
                          <li><Link to="/patientDashboard">Appointments</Link></li>
                         <li><Link to="/doctorsList">Booking</Link></li>
                         <li><Link to="/records">Records</Link></li>
                         <li><Link to="/profile">Profile</Link></li>
                          </ul>
                        </nav>
                      </div>
            </div>
          )
    }
  
}

export default Navbar