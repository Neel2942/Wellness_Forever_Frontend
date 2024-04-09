import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { saveAs } from 'file-saver';
import { Document, Page, Text, View, StyleSheet,pdf  } from '@react-pdf/renderer';

function DoctorsRecord() {
    const {state}=useLocation();
    console.log("State");
    console.log(state);
    const [doctorRecordData, setDoctorRecordData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn,setisLoggedIn] = useState(true);
    const [userTypeLog,setuserTypeLog] = useState("doctor");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/doctorRecords');
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
            setDoctorRecordData(result);
            setLoading(false);
            } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        };
        fetchData();
      }, []);
    
      const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#fff'
        },
        section: {
            margin: 5,
            paddingTop: 35,
            flexGrow: 1,
        },
        heading: {
            fontSize: 16,
            marginBottom: 10,
            fontWeight: 'bold',
            textAlign: 'center' // Center the heading text
        },
        content: {
            fontSize: 14,
            marginBottom: 2,
            textAlign: 'center' // Center the content text
        }
    });
    

    const handleDownloadPDF = async (item) => {
        // Create PDF document
        const MyDocument = (
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Prescriptions</Text>
                        <Text style={styles.heading}>Patient Name: {item.appointmentWith}</Text>
                        <Text style={styles.heading}>Date of Appointment: {item.date}</Text>
                        <Text style={styles.heading}>Time: {item.time}</Text>
                        <Text style={styles.heading}>Symptoms: {item.symptoms}</Text>    
                        <Text style={styles.heading}>Medicines: {item.medicine}</Text>     
                        <Text style={styles.heading}>Notes: {item.note}</Text>
                    </View>
                </Page>
            </Document>
        );
    
        const blob = await pdf(MyDocument).toBlob()
        saveAs(blob, 'Prescription.pdf')
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
                   <h2 className='text-white text-center mb-3'>Doctor Records</h2>
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
                         {doctorRecordData.map((item,index) => (
                             <tr  key={item._id}>
                               <td >{item.no}</td>
                               <td >{item.appointmentWith}</td>
                               <td >{item.date}</td>
                               <td >{item.time}</td>
                               <td ><button onClick={() => handleDownloadPDF(item)} className='btn btn-primary'>Download</button></td> 
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

export default DoctorsRecord