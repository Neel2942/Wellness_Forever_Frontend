import React,  { useState, useEffect } from 'react';
import { Link,useLocation} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Records() {
    const {state}=useLocation();
    console.log("State");
    console.log(state);
    const [patientRecordData, setPatientRecordData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn,setisLoggedIn] = useState(true);
    const [userTypeLog,setuserTypeLog] = useState("patient");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/patientRecords');
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            if (result === "notLoggedIn") {
              setisLoggedIn(false);
            }else{
              if(state.userType !== userTypeLog){
                setisLoggedIn(false);
              }
            }
            setPatientRecordData(result);
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
           <div>
               <div className="d-grid gap-3 ">
               <div className='row g-3'>
               <div className="col-2">
               <Navbar userType={state} />
             </div>
                   <div className="p-4 patient-bg rounded-right col"               >
                   <h2 className='text-white text-center mb-3'>Patient Records</h2>
                       <table className="table table-striped table-bordered">
                         <thead>
                           <tr>
                             <th >No.</th>
                             <th >Appointment With</th>
                             <th >Date</th>
                             <th >Time</th>
                             <th >Action</th>
                           </tr>
                         </thead>
                         <tbody>
                         {patientRecordData.map((item,index) => (
                             <tr  key={item._id}>
                               <td >{item.no}</td>
                               <td >{item.appointmentWith}</td>
                               <td >{item.date}</td>
                               <td >{item.time}</td>
                               <td ><button className='btn btn-danger'>Download</button></td> 
                             </tr>
                           ))}
                         </tbody>
                       </table>
                    </div>
                 </div>
                 </div>
             </div>
    
         )}
        </React.Fragment>
     )
    }
    else{
      return(
        <React.Fragment>
            <div>
            <p>Please log in to access the patient dashboard.</p>
            <Link to="/login">Login</Link>
          </div>
        </React.Fragment>
      )
     }
}

export default Records