import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "./Signup.module.css";

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
    const [description, setDescription] = useState('');

    const [formErrors,setFormErrors] = useState({});

    const validateForm = ()=> {
        const errors={};
    
        if (!firstName) {
          errors.firstName="Firstname is required"
          
        } else if (!/^[^-\s\d][a-zA-Z\s-]+$/.test(firstName)) {
            errors.firstName="First Name must contain only alphabetic characters"
           
        }
    
        if (!lastName) {
          errors.lastName = 'Last Name is required.';
        } else if (!/^[^-\s\d][a-zA-Z\s-]+$/.test(lastName)) {
          errors.lastName = 'Last Name must contain only alphabetic characters.';
        }
    
        if (!email) {
            errors.email = 'Email is required.';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Invalid email address.';
        }
    
        if (!password) {
            errors.password = 'Password is required.';
        }
        
        if (!phoneNumber) {
            errors.phoneNumber = 'Phone number is required.';
          } else if (!/^\d{3}\d{4}\d{3}$/.test(phoneNumber)) {
            errors.phoneNumber = 'Phone number must be in the format XXXXXXXXXX.';
        }
    
        if (!age) {
          errors.age = 'Age is required.';
        } else if (age < 20 || age > 70) {
          errors.age = 'Age must be between 20 and 70.';
        }

        if(userType === "doctor"){
            if (!specialization) {
                errors.specialization = 'Specialization is required.';
            }
            if (!description) {
                errors.description = 'Description is required.';
            }
        }
    
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
      }

    async function submit(e) {
        e.preventDefault();

        if(validateForm()){
            const userData = {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                age,
                userType,
                specialization: userType === 'doctor' ? specialization : '',
                description: userType === 'doctor' ? description :''
            };
        
            try {
                const response = await axios.post("/signup", userData);
        
                if (response.data === "exist") {
                    console.log("User exists");
                    
                } else if (response.data === "notexists") {
                    path("/login");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Please try again.");
            }
        }
        }

    return (
        <>
            <div className={styles.Signup}>
            <h1>Signup</h1>
            <form onSubmit={submit}>
                <input type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" name="fname" />
                {formErrors.firstName && <p className={styles.errorMsg} >{formErrors.firstName}</p>}
                <input type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" name="lname" />
                {formErrors.lastName && <p className={styles.errorMsg} >{formErrors.lastName}</p>}
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email address" name="email" />
                {formErrors.email && <p className={styles.errorMsg} >{formErrors.email}</p>}
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Create your Password" name="password" />
                {formErrors.password && <p className={styles.errorMsg} >{formErrors.password}</p>}
                <input type="number" onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" name="pnumber" />
                {formErrors.phoneNumber && <p className={styles.errorMsg} >{formErrors.phoneNumber}</p>}
                <input type="number" onChange={(e) => setAge(e.target.value)} placeholder="Age" name="age" />
                {formErrors.age && <p className={styles.errorMsg} >{formErrors.age}</p>}
                <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>

                {userType === 'doctor' && (
                    <>
                        <input type="text" onChange={(e) => setSpecialization(e.target.value)} placeholder="Specialization" name="specialization" />
                        {formErrors.specialization && <p className={styles.errorMsg} >{formErrors.specialization}</p>}
                        
                        <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Description" name="description" />
                        {formErrors.description && <p className={styles.errorMsg}>{formErrors.description}</p>}
                        
                    </>
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
