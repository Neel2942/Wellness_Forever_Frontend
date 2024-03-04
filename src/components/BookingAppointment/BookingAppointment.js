import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './BookingAppointment.css';

function BookingAppointment() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const path = useNavigate();

    const validateForm = () => {
        const errors = {};
    
        if (!fullName) {
            errors.fullName = "Full Name is required";
        } else if (!/^[^-\s\d][a-zA-Z\s-]+$/.test(fullName)) {
            errors.fullName = "Invalid Full Name format";
        }
    
        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Invalid email address.';
        }
    
        if (!phoneNumber) {
            errors.phoneNumber = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            errors.phoneNumber = 'Phone number must be 10 digits.';
        }
    
        if (!address) {
            errors.address = 'Address is required.';
        }
    
        if (!category) {
            errors.category = 'Category is required.';
        }
    
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

        if (!reason) {
            errors.reason = 'Reason is required.';
        } 
    
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    async function submit(e) {
        e.preventDefault();
        if(validateForm()){
            console.log("All correct");
            const bookingAppointmentData = {
                fullName,
                email,
                phoneNumber,
                address,
                category,
                date,
                time,
                reason
            };

            try {
                const response = await axios.post("/bookingAppointment", bookingAppointmentData);
                if (response.data === "Booked") {
                    console.log("Appointment Booked");  
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Please try again.");
            }
        }
    }

    const handleCancel = () => {
         path("/"); // redirect to home page
    }

    return (
        <div >
            <h1>Book Appointment</h1>
            <form onSubmit={submit} id="bookAppointment">
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" onChange={(e) => setFullName(e.target.value)} name="fullName" id="fullName" />
                    {formErrors.fullName && <p className="errorMsg">{formErrors.fullName}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" />
                    {formErrors.email && <p className="errorMsg">{formErrors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="number" onChange={(e) => setPhoneNumber(e.target.value)} name="phoneNumber" id="phoneNumber" />
                    {formErrors.phoneNumber && <p className="errorMsg">{formErrors.phoneNumber}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" onChange={(e) => setAddress(e.target.value)} name="address" id="address" />
                    {formErrors.address && <p className="errorMsg">{formErrors.address}</p>}
                </div>
                <div  className="form-group">
                    <label htmlFor="category">Doctor</label>
                    <select name="category" onChange={(e) => setCategory(e.target.value)} defaultValue="" >
                        <option value="" disabled >Select Doctor</option>
                        <option value="Dermatologist">Dr. Neel Patel</option>
                        <option value="Orthopadic">Dr. Karan Dhiman</option>
                        <option value="Orthopadic">Dr. Swapnil Nanavati</option>
                        <option value="Orthopadic">Dr. Zaid Alam</option>
                        <option value="Orthopadic">Dr. Nidhi Shetty</option>
                    </select>
                    {formErrors.category && <p className="errorMsg">{formErrors.category}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input type="date" onChange={(e) => setDate(e.target.value)} name="date" id="date" />
                    {formErrors.date && <p className="errorMsg">{formErrors.date}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input type="time" onChange={(e) => setTime(e.target.value)} name="time" id="time" />
                    {formErrors.time && <p className="errorMsg">{formErrors.time}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="reason">Reason for appointment</label>
                    <textarea onChange={(e) => setReason(e.target.value)} name="reason" id="reason" />
                    {formErrors.reason && <p className="errorMsg">{formErrors.reason}</p>}
                </div>
                <div className="form-group" id='buttons'>
                    <input type="button" id='cancel' value="Cancel" onClick={handleCancel}/>
                    <input type="submit" id='submit' value="Submit" />
                </div>
            </form>
        </div>
    );
}

export default BookingAppointment;
