import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import './DoctorDashboard.css';

function DoctorDashboard() {
  const [doctorData, setDoctorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn,setisLoggedIn]=useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/doctorDashboard');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        
        if (result === "notLoggedIn") {
          setisLoggedIn(false);
        }
        setDoctorData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

if(isLoggedIn){
    return (
      <React.Fragment>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="container mt-4">
            <div className="sidebar">
              <button className="sidebar-button">Appointment</button>
              <button className="sidebar-button">Bookings</button>
              <button className="sidebar-button">Profile</button>
            </div>
            <div className="content">
              <h2>Doctor Dashboard</h2>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th className="custom-column">No.</th>
                    <th className="custom-column">Appointment With</th>
                    <th className="custom-column">Date</th>
                    <th className="custom-column">Time</th>
                    <th className="custom-column">Status</th>
                    <th className="custom-column">Option</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorData.map((item) => (
                    <tr className="custom-rows" key={item._id}>
                      <td className="custom-data">{item.no}</td>
                      <td className="custom-data">{item.appointmentWith}</td>
                      <td className="custom-data">{item.date}</td>
                      <td className="custom-data">{item.time}</td>
                      <td className="custom-data">{item.status}</td>
                      <td className="custom-data">{item.option}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </React.Fragment>
    );
}
else{
  return(
    <React.Fragment>
        <div>
        <p>Please log in to access the doctor dashboard.</p>
        <Link to="/login">Login</Link>
      </div>
    </React.Fragment>
  )
 }

}

export default DoctorDashboard;
