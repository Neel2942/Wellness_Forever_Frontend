import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from './DoctorProfile.module.css'; // Import CSS module
import Navbar from '../Navbar/Navbar';

function DoctorProfile() {
    const location = useLocation();
    const { user } = location.state;
    console.log(user);

    const [editMode, setEditMode] = useState(false);

    const [firstName, setFirstName] = useState(user.userType.firstName);
    const [lastName, setLastName] = useState(user.userType.lastName);
    const [email, setEmail] = useState(user.userType.email);
    const [phoneNumber, setPhoneNumber] = useState(user.userType.phoneNumber);
    const [age, setAge] = useState(user.userType.age);

    const path = useNavigate();

    const toggleEditMode = () => {
        setEditMode(prevMode => !prevMode);
    };

    async function submit(e) {
        e.preventDefault();

        const userData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            age,
        };

        try {
            const response = await axios.post("/updateuser", userData);

            if (response.data === "Updated") {
                console.log("User Updated");
                path("/doctorDashboard",{state:user.userType});

            } else if (response.data === "Not Updated") {
                console.log("User Not Updated");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <div className={styles.Container}>
            <Navbar userType={user.userType} />
            <div className={styles.userInfoColumn}>
                <div className={`card ${styles.card}`}>
                    <div className="card-body">
                        <h5 className="card-title">Profile</h5>
                        {editMode ? (
                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" onChange={(e) => setFirstName(e.target.value)} className="form-control" id="firstName" name="firstName" value={firstName} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" onChange={(e) => setLastName(e.target.value)} className="form-control" id="lastName" name="lastName" value={lastName} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" name="email" value={email} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                    <input type="tel" onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" id="phoneNumber" name="phoneNumber" value={phoneNumber} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label">Age</label>
                                    <input type="number" className="form-control" onChange={(e) => setAge(e.target.value)} id="age" name="age" value={age} />
                                </div>
                                <button type="submit" className="btn btn-primary">Update Details</button>
                                <button type="button" className="btn btn-secondary" onClick={toggleEditMode}>Cancel</button>
                            </form>
                        ) : (
                            <div>
                                <p><strong>Name:</strong> {user.userType.firstName} {user.userType.lastName}</p>
                                <p><strong>Email:</strong> {user.userType.email}</p>
                                <p><strong>Phone Number:</strong> {user.userType.phoneNumber}</p>
                                <p><strong>Age:</strong> {user.userType.age}</p>
                                <button type="button" className="btn btn-primary" onClick={toggleEditMode}>Edit Details</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorProfile;
