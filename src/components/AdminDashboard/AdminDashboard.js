import React,{ useState, useEffect } from 'react'
import { Link} from 'react-router-dom';
import "./AdminDashboard.css";

function AdminDashboard() {

    const [adminData, setAdminData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn,setisLoggedIn]=useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/adminDashboard');
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
        <h2>Admin Dashboard</h2>
          <div className="sidebar">
            <button className="sidebar-button">List Of Users</button>
            <button className="sidebar-button">Doctor's Appointment</button>
            <button className="sidebar-button">Patient's Appointment</button>
          </div>
             <table className="custom-table">
               <thead>
                 <tr>
                   <th className="custom-column">Name</th>
                   <th className="custom-column">Type Of User</th>
                   <th className="custom-column">Specilization</th>
                  
                 </tr>
               </thead>
               <tbody>
               {adminData.map((item) => (
                   <tr className='custom-rows' key={item._id}>
                     <td className="custom-data">{item.fullName}</td>
                     <td className="custom-data">{item.userType}</td>
                     {item.userType === 'doctor' && (<td className="custom-data">{item.specialization}</td>)}
                     {item.userType === 'patient' && (<td className="custom-data">---</td>)}   
                   </tr>
                 ))}
               </tbody>
             </table>
         </div>
   )}
     
  </React.Fragment>
  )
}
else{
  return(
    <React.Fragment>
        <div>
        <p>Please log in to access the admin dashboard.</p>
        <Link to="/login">Login</Link>
      </div>
    </React.Fragment>
  )
 }
}

export default AdminDashboard