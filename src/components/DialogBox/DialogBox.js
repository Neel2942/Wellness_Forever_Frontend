import React, { useState } from 'react';
import styles from "./DialogBox.module.css";

function DialogBox({ isOpen, handleClose, data }) {
  const { appointmentWith, date, time, symptoms, userType} = data;
  const [usertype,setUserType] = useState(userType);
  return (
    <div className={isOpen ? styles.dialogBox : styles.hidden}>
      <div className={styles.dialogContent}>
        <button className={styles.closeButton} onClick={handleClose}>Close</button>
        { (userType == "patient") 
        ? ( <h2>Doctor Details</h2>) : (<h2>Patient Details</h2>)}
        <div className={styles.field}>
          <label>Name:</label>
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
      </div>
    </div>
  );
}

export default DialogBox;
