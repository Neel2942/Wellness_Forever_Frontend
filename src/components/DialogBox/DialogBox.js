import React, { useState } from 'react';
import styles from "./DialogBox.module.css";

function DialogBox({ isOpen, handleClose, data ,userType}) {
  console.log(data)
  console.log(userType)
  if(userType === 'doctor' || userType === 'patient'){
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
        </div>
      </div>
    );
  } else{
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
