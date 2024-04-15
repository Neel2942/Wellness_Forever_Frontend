import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { saveAs } from 'file-saver';
import { Document, Page, Text, View, StyleSheet,pdf,Image  } from '@react-pdf/renderer';
import AuthLoginComponent from '../AuthLoginComponent/AuthLoginComponent';
import customSTyles from './DoctorsRecord.module.css'
import logoImage from '../Header/logo/logo.jpeg'; 

function DoctorsRecord() {
    const [doctorRecordData, setDoctorRecordData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn,setisLoggedIn] = useState(true);
    const [userTypeLog,setuserTypeLog] = useState("doctor");
    const {state}=useLocation();

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
            flexDirection: 'column',
            padding: 20,
            backgroundColor: '#fff',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
        },
        logo: {
            width: 100,
            height: 100,
        },
        title: {
            fontSize: 20,
            marginLeft: 200,
            fontWeight: 'bold',
            color: '#333',
        },
        contentSection: {
            margin: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
        },
        heading: {
            fontSize: 16,
            marginTop:20,
            marginBottom: 5,
            marginLeft:12,
            fontWeight: 'bold',
        },
        content: {
            fontSize: 14,
            marginBottom: 15,
        },
    });
    

    const handleDownloadPDF = async (item) => {
        // Create PDF document
        const MyDocument = (
            <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image src={logoImage} style={styles.logo} />                    
                </View>
                <View>
                    <Text style={styles.title}>Wellness Forever</Text>
                </View>
                <View>
                <Text style={styles.heading}>Prescription</Text>
                </View>
                <View style={styles.contentSection}>                    
                    <Text style={styles.content}>Doctor Name: {item.appointmentWith}</Text>
                    <Text style={styles.content}>Date of Appointment: {item.date}</Text>
                    <Text style={styles.content}>Time: {item.time}</Text>
                    <Text style={styles.content}>Symptoms: {item.symptoms}</Text>
                    <Text style={styles.content}>Medicines: {item.medicine}</Text>
                    <Text style={styles.content}>Notes: {item.note}</Text>
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
               <Navbar user={state} />
             </div>
                   <div className="p-4 patient-bg rounded-right col"               >
                   <h2 className='text-white text-center mb-3'>Doctor Records</h2>
                   {doctorRecordData.length == 0 ? (
                            <h4 className={customSTyles.noAppoitnment}> No Records to display</h4>
                     ) : (
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
                       </table>)}
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
        <AuthLoginComponent user="Doctor"></AuthLoginComponent>
      )
     }
}

export default DoctorsRecord