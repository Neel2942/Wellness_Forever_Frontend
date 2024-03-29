import React,  { useState, useEffect } from 'react';
import { Link,useLocation} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import DialogBox from "../DialogBox/DialogBox";
import CancelFormDialogBox from '../CancelFormDialogBox/CancelFormDialogBox';


function PatientDashboard() {

  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn,setisLoggedIn] = useState(true);
  const [userType,setUserType] = useState("patient");
  const [openDialogIndex, setOpenDialogIndex] = useState(null);
  const [openCancelDialogIndex, setOpenCancelDialogIndex] = useState(null);
  const {state}=useLocation();
  console.log("patientDashboard");
  console.log(state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/patientDashboard');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (result === "notLoggedIn") {
          setisLoggedIn(false);
        }else{
          if(state.userType !== userType){
            setisLoggedIn(false);
          }
        }
        setPatientData(result);
        setLoading(false);
        } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openDialog = (index) => {
    setOpenDialogIndex(index);
  };

  const closeDialog = () => {
    setOpenDialogIndex(null);
  };

  const openCancelFormDialog = (index) => {
    setOpenCancelDialogIndex(index);
  };

  const closeCancelDialog = () => {
    setOpenCancelDialogIndex(null);
  };
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
               <h2 className='text-white text-center mb-3'>Patient Dashboard</h2>
                   <table className="table table-striped table-bordered">
                     <thead>
                       <tr>
                         <th >No.</th>
                         <th >Appointment With</th>
                         <th >Date</th>
                         <th >Time</th>
                         <th >Status</th>
                         <th >Option</th>
                         <th >Action</th>
                       </tr>
                     </thead>
                     <tbody>
                     {patientData.map((item,index) => (
                         <tr  key={item._id}>
                           <td >{item.no}</td>
                           <td >{item.appointmentWith}</td>
                           <td >{item.date}</td>
                           <td >{item.time}</td>
                           <td >{item.status}</td>
                           <td ><button className='btn btn-danger' onClick={() => openCancelFormDialog(index)}>Cancel</button></td>
                           <td><button className="btn btn-primary" onClick={() => openDialog(index)}>View Details</button></td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                </div>
             </div>
             </div>
         </div>

     )}
       {openDialogIndex !== null && (
          <DialogBox isOpen={true} handleClose={closeDialog} data={patientData[openDialogIndex]} userType='patient'/>
        )}
        {openCancelDialogIndex !== null && (
          <CancelFormDialogBox isOpen={true} handleClose={closeCancelDialog} data={patientData[openCancelDialogIndex]}/>
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

export default PatientDashboard