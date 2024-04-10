import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import styles from './BookingAppointment.module.css';

function BookingAppointment() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [status, setStatus] = useState('Upcoming');
    const [formErrors, setFormErrors] = useState({});
    const path = useNavigate();
    const{state}=useLocation();
    const [doctorName,setDoctorName] = useState(state.doctorName);
    const [doctorId,setDoctor] = useState(state.doctorId);

    const validateForm = () => {
        const errors = {};
       
        if (!date) {
            errors.date = 'Date is required.';
        } else {
            const selectedDate = new Date(date);
            const currentDate = new Date();
            if (selectedDate < currentDate) {
                errors.date = 'Date must be in the future.';
            }
        }
    
        if (!time) {
            errors.time = 'Time is required.';
        } 

        if (!symptoms) {
            errors.symptoms = 'Symptoms is required.';
        } 
    
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    async function submit(e) {
        e.preventDefault();
        if(validateForm()){
            const bookingAppointmentData = {
                doctorId,
                date,
                time,
                symptoms,
                status
            };

            try {
                const response = await axios.post("/bookingAppointment", bookingAppointmentData);
                if (response.data === "Booked") {
                    path("/patientDashboard",{state:state});  
                }else if(response.data === "notLoggedIn"){
                    path("/");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Please try again.");
            }
        }
    }

    const handleCancel = () => {
         path("/patientDashboard",{state:state}); // redirect to home page
    }
    return (
        <div >
            <h1>Book Appointment</h1>
            <form onSubmit={submit} id={styles.bookAppointment}>

                <div className={styles.form_group}>
                    <label htmlFor="doctorName">Doctor Name</label>
                    <input type="text" value={doctorName} name="date" id="date" disabled />
                   
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="date">Date</label>
                    <input type="date" onChange={(e) => setDate(e.target.value)} name="date" id={styles.date} />
                    {formErrors.date && <p className={styles.errorMsg}>{formErrors.date}</p>}
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="time">Time</label>
                    <input type="time" onChange={(e) => setTime(e.target.value)} name="time" id={styles.time} />
                    {formErrors.time && <p className={styles.errorMsg}>{formErrors.time}</p>}
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="symptoms">Symptoms</label>
                    <textarea onChange={(e) => setSymptoms(e.target.value)} name="symptoms" id={styles.symptoms} />
                    {formErrors.symptoms && <p className={styles.errorMsg}>{formErrors.symptoms}</p>}
                </div>
                <div className={styles.form_group} id={styles.buttons}>
                    <input type="button" id={styles.cancel} value="Cancel" onClick={handleCancel}/>
                    <input type="submit" id={styles.submit} value="Submit" />
                </div>
            </form>
        </div>
    );
}

export default BookingAppointment;
