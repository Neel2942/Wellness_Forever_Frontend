import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

function Signup() {
    const path = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [userType, setUserType] = useState('patient');
    const [specialization, setSpecialization] = useState('');

    async function submit(e) {
        e.preventDefault();
    
        const userData = {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            age,
            userType,
            specialization: userType === 'doctor' ? specialization : 'patient',
        };
    
        try {
            const response = await axios.post("/signup", userData);
    
            if (response.data === "exist") {
                console.log("User exists");
                // Display user exists message on the UI or handle accordingly
            } else if (response.data === "notexists") {
                path("/login");
                // Redirect to login page or display success message
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <>
            <div className="Signup">
            <h1>Signup</h1>
            <form onSubmit={submit}>
                <input type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" name="fname" />
                <input type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" name="lname" />
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email address" name="email" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Create your Password" name="password" />
                <input type="number" onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" name="pnumber" />
                <input type="number" onChange={(e) => setAge(e.target.value)} placeholder="Age" name="age" />
                <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>

                {userType === 'doctor' && (
                    <input type="text" onChange={(e) => setSpecialization(e.target.value)} placeholder="Specialization" name="specialization" />
                )}

                <input type="submit" value="Signup" />
            </form>
            <br />

            <p>OR</p>

            <br />

            <Link to="/login">Click Here to Login</Link>
        </div>
        </>

    );
}

export default Signup;
