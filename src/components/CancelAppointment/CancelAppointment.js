import React from "react";
import styles from "./CancelAppointment.module.css";
import { useNavigate, useLocation  } from "react-router-dom";
import axios from "axios";

function CancelAppointment() {
  const location = useLocation();
  const path = useNavigate();
  const { cancelId,cancelDetails } = location.state;

  const handleCancelRequest = async (e) => {
    e.preventDefault();
    let data={
      cancelAppointmentId:cancelId
    }
    try {
      const response = await axios.post("/cancelRequest", data);

      if (response.data === "Cancelled") {
          let obj={
            userType:'admin'
          }
          path("/adminDashboard",{state : obj})
      }else{
        if(response.data === "notLoggedIn"){
          path("/");
        }
      }
  } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
  }
  };

  return (
    <div className={styles.cancel_page_container}>
      <form onSubmit={handleCancelRequest} className={styles.cancel_request_form}>
      <h3 className={styles.cancel_heading}>Cancel Request Form</h3>
        <div className={styles.form_field}>
          <label>Patient Name:</label>
          <div>{cancelDetails.patientName}</div>
        </div>
        <div className={styles.form_field}>
          <label>Doctor Name:</label>
          <div>{cancelDetails.doctorName}</div>
        </div>
        <div className={styles.form_field}>
          <label>Time:</label>
          <div>{cancelDetails.time}</div>
        </div>
        <div className={styles.form_field}>
          <label>Date:</label>
          <div>{cancelDetails.date}</div>
        </div>
        <div className={styles.form_field}>
          <label>Reason for Cancellation:</label>
          <textarea
            name="reason"
            value={cancelDetails.reason}
            rows="4" // Adjust the number of rows as needed
            disabled
          />
        </div>
        <div className={styles.button_group}>
          <button className={styles.accept_btn}>Accept Request</button>
        </div>
      </form>
    </div>
  );
}

export default CancelAppointment;
