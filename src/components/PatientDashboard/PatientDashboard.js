import React,  { useState, useEffect } from 'react';
import './PatientDashboard.css'

function PatientDashboard() {

  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/patientDashboard');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setPatientData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  return (
     <React.Fragment>
       {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container mt-4">
            <h2>Patient Dashboard</h2>
          
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
                  {patientData.map((item) => (
                      <tr className='custom-rows' key={item._id}>
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
       
      )}
        
     </React.Fragment>
  )
}

export default PatientDashboard