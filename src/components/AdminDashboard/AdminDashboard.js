import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/adminDashboard");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (result === "notLoggedIn") {
          setisLoggedIn(false);
        }
        setAdminData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoggedIn) {
    return (
      <React.Fragment>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2>Admin Dashboard</h2>
            <div className='adminContainer'>
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
              <div id='adminData'>
                <table className='admin-custom-table'>
                  <thead>
                    <tr>
                      <th className='admin-custom-column'>Name</th>
                      <th className='admin-custom-column'>Type Of User</th>
                      <th className='admin-custom-column'>Specilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminData.map((item) => (
                      <tr
                        className='admin-custom-rows'
                        key={item._id}>
                        <td className='admin-custom-data'>{item.fullName}</td>
                        <td className='admin-custom-data'>{item.userType}</td>
                        {item.userType === "doctor" && (
                          <td className='admin-custom-data'>
                            {item.specialization}
                          </td>
                        )}
                        {item.userType === "patient" && (
                          <td className='admin-custom-data'>---</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
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
          <p>Please log in to access the admin dashboard.</p>
          <Link to='/login'>Login</Link>
        </div>
      </React.Fragment>
    );
  }
}


export default AdminDashboard;
