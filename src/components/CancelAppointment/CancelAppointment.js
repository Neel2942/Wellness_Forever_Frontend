import React, { useState } from "react";
import "./CancelAppointment.css";

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
    <div className="cancel-page-container">
      <h2>Admin</h2>

      <form onSubmit={handleCancelRequest} className="cancel-request-form">
      <h3 className="cancel-heading">Cancel Request Form</h3>
        <div className="form-field">
          <label>Patient Name:</label>
          <div>{cancelRequest.patientName}</div>
        </div>
        <div className="form-field">
          <label>Doctor Name:</label>
          <div>{cancelRequest.doctorName}</div>
        </div>
        <div className="form-field">
          <label>Time:</label>
          <div>{cancelRequest.time}</div>
        </div>
        <div className="form-field">
          <label>Date:</label>
          <div>{cancelRequest.date}</div>
        </div>
        <div className="form-field">
          <label>Reason for Cancellation:</label>
          <textarea
            name="reason"
            value={cancelRequest.reason}
            onChange={handleInputChange}
            rows="4" // Adjust the number of rows as needed
          />
        </div>
        <div className="button-group">
          
          <button className="reject-btn">Reject Request</button>
          <button className="accept-btn">Accept Request</button>
        </div>
      </form>
    </div>
  );
}

export default CancelAppointment;
