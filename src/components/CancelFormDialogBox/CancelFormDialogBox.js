import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import styles from "./CancelFormDialogBox.module.css";
import axios from "axios";

function CancelFormDialogBox({ isOpen, handleClose, data }) {
    const { appointmentWith, date, time, symptoms, appointmentId,userType} = data;
    const [reason, setReason] = useState('');
    const [formErrors,setFormErrors] = useState({});
    const backendUrl = process.env.BACKEND_API || "https://wellnessforever.onrender.com";
   
    const validateForm = ()=> {
        const errors={};

        if (!reason) {
            errors.reason = 'Reason is required.';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
      }


    const handleRequest=async ()=>{
        if(validateForm()){
            const requestData={
                appointmentId:appointmentId,
                reason:reason,
            } 
        try {
            const response = await axios.post(`${backendUrl}/cancelAppointment`, requestData);
    
            if (response.data === "Requested") {
                handleClose();
                
            } else if (response.data === "Failed") {
                console.log("Failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
        }
       
   }
    return (
      <div className={isOpen ? styles.dialogBox : styles.hidden}>
        <div className={styles.dialogContent}>
          <button  className={styles.closeButton} onClick={handleClose}>Close</button>
          <div className="modal-header">
                        <h5 className={styles.modalTitle} id="cancelFormDialogLabel">Appointment Details</h5>
                    </div>
                    <div className="modal-body">
                        <div className={styles.field}>
                            <label>Appointment With:</label>
                            <span>{appointmentWith}</span>
                        </div>
                        <div className={styles.field}>
                            <label>Date:</label>
                            <span>{date}</span>
                        </div>
                        <div className={styles.field}>
                            <label>Time:</label>
                            <span>{time}</span>
                        </div>
                        <div className={styles.field}>
                            <label>Symptoms:</label>
                            <span>{symptoms}</span>
                        </div>
                        <div className={styles.field}>
                            <label>Reason:</label>
                            <textarea className="form-control" rows="3"  onChange={(e) => setReason(e.target.value)} name='reason'></textarea>
                            {formErrors.reason && <p className={styles.errorMsg} >{formErrors.reason}</p>}
                        </div>
                    </div>
                    <div className={` modal-footer ${styles.footer}`}>
                        <button type="button" className={`btn btn-primary ${styles.submitBtn}`} onClick={handleRequest}>Submit</button>
                        <button type="button" className="btn btn-danger" onClick={handleClose}>Cancel</button>
                    </div>
        </div>
      </div>
    );
}

export default CancelFormDialogBox