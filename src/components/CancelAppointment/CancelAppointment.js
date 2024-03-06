import React, { useState } from "react";
import styles from "./CancelAppointment.module.css";

function CancelAppointment() {
  const [cancelRequest, setCancelRequest] = useState({
    patientName: "",
    doctorName: "",
    time: "",
    date: "",
    reason: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCancelRequest({
      ...cancelRequest,
      [name]: value
    });
  };

  const handleCancelRequest = async (e) => {
    e.preventDefault();
    // Logic to handle cancellation request submission
    console.log("Cancel request:", cancelRequest);
  };

  return (
    <div className={styles.cancel_page_container}>
      <h2>Admin</h2>

      <form onSubmit={handleCancelRequest} className={styles.cancel_request_form}>
      <h3 className={styles.cancel_heading}>Cancel Request Form</h3>
        <div className={styles.form_field}>
          <label>Patient Name:</label>
          <div>{cancelRequest.patientName}</div>
        </div>
        <div className={styles.form_field}>
          <label>Doctor Name:</label>
          <div>{cancelRequest.doctorName}</div>
        </div>
        <div className={styles.form_field}>
          <label>Time:</label>
          <div>{cancelRequest.time}</div>
        </div>
        <div className={styles.form_field}>
          <label>Date:</label>
          <div>{cancelRequest.date}</div>
        </div>
        <div className={styles.form_field}>
          <label>Reason for Cancellation:</label>
          <textarea
            name="reason"
            value={cancelRequest.reason}
            onChange={handleInputChange}
            rows="4" // Adjust the number of rows as needed
          />
        </div>
        <div className={styles.button_group}>
          
          <button className={styles.reject_btn}>Reject Request</button>
          <button className={styles.accept_btn}>Accept Request</button>
        </div>
      </form>
    </div>
  );
}

export default CancelAppointment;
