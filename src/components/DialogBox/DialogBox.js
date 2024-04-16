import React, { useState } from 'react';
import styles from "./DialogBox.module.css";
import axios from "axios";

function DialogBox({ isOpen, handleClose, data ,userType}) {
  const [medicines, setMedicines] = useState('');
  const [notes, setNotes] = useState('');
  const [formErrors,setFormErrors] = useState({});
  const backendUrl = process.env.BACKEND_API || "https://wellnessforever.onrender.com";

  const validateForm = ()=> {
    const errors={};

    if (!medicines) {
        errors.medicines = 'Medicines is required.';
    }

    if (!notes) {
      errors.notes = 'Notes is required.';
  }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleRequest=async ()=>{
    if(validateForm()){
        const requestData={
            appointmentId:data.appointmentId,
            medicine:medicines,
            note:notes
        } 
    try {
        const response = await axios.post(`${backendUrl}/doctorPrescription`, requestData);

        if (response.data === "prescriptionAdded") {
            console.log("Prescription Added");
            handleClose();
            
        } else if (response.data === "prescriptionNotAddes") {
            console.log("prescriptionNotAddes");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
    }
   
}
if(userType === "doctor" || userType === "patient"){

  return (
    <div className={isOpen ? styles.dialogBox : styles.hidden}>
      <div className={styles.dialogContent}>
        <button className={styles.closeButton} onClick={handleClose}>Close</button>
        { (userType === "patient") 
        ? ( <h2>Doctor Details</h2>) : (<h2>Patient Details</h2>)}
        <div className={styles.field}>
          <label>Name:</label>
          <span>{data.appointmentWith}</span>
        </div>
        <div className={styles.field}>
          <label>Date:</label>
          <span>{data.date}</span>
        </div>
        <div className={styles.field}>
          <label>Time:</label>
          <span>{data.time}</span>
        </div>
        <div className={styles.field}>
          <label>Symptoms:</label>
          <span>{data.symptoms}</span>
        </div>
        {userType === 'doctor' && (
          <>
            <div className={styles.field}>
                          <label>Medicines:</label>
                          <textarea className="form-control" rows="3"  onChange={(e) => setMedicines(e.target.value)} name='medicines'></textarea>
                          {formErrors.medicines && <p className={styles.errorMsg} >{formErrors.medicines}</p>}
            </div>
            <div className={styles.field}>
                          <label>Notes:</label>
                          <textarea className="form-control" rows="3"  onChange={(e) => setNotes(e.target.value)} name='notes'></textarea>
                          {formErrors.notes && <p className={styles.errorMsg} >{formErrors.notes}</p>}
            </div>
            <div className={` modal-footer ${styles.footer}`}>
                      <button type="button" className={`btn btn-primary ${styles.submitBtn}`} onClick={handleRequest}>Submit</button>
                      <button type="button" className="btn btn-danger" onClick={handleClose}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}else{
  return (
    <div className={isOpen ? styles.dialogBox : styles.hidden}>
      <div className={styles.dialogContent}>
        <button className={styles.closeButton} onClick={handleClose}>Close</button>
        {data.patientDetails.map((item, index) => ( 
                <div>
                    <h2>Patient Details</h2>
                    <div className={styles.field}>
                      <label>Name:</label>
                      <span>{item.patientName}</span>
                    </div>
                    <div className={styles.field}>
                      <label>Date:</label>
                      <span>{item.appointmentDate}</span>
                    </div>
                    <div className={styles.field}>
                      <label>Time:</label>
                      <span>{item.appointmentTime}</span>
                    </div>
                    <div className={styles.field}>
                      <label>Symptoms:</label>
                      <span>{item.symptoms}</span>
                    </div>
                </div>
        ))}
      </div>
    </div>
);
}
}

export default DialogBox;
