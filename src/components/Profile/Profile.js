// ProfilePage.js

import React from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from './Profile.module.css'; // Import CSS module
import Navbar from '../Navbar/Navbar';

function ProfilePage() {
  
    const location=useLocation();
    const {user}=location.state;
    console.log(user);

    return (
        <div className={`container mt-5 ${styles.profileContainer}`}>
            <div className="row">
            <Navbar  userType={user.userType}></Navbar>
                <div className={`col-md-9 ${styles.userInfoColumn}`}>
                    <div className={`card ${styles.card}`}>
                        <div className="card-body">
                            <h5 className="card-title">User Information</h5>
                            <p className="card-text">Username: {user.userType.firstName + " " + user.userType.lastName}</p>
                            <p className="card-text">Email: {user.userType.email}</p>
                            {/* Add more user information here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
