import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import Navbar from "../Navbar/Navbar";
import AuthLoginComponent from '../AuthLoginComponent/AuthLoginComponent';

function AdminDashboard() {
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const [userType,setUserType] = useState("admin");
  const {state}=useLocation();
  const backendUrl = process.env.BACKEND_API || "https://wellnessforever.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/adminDashboard`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (result === "notLoggedIn") {
          setisLoggedIn(false);
        }else{
          if(state.userType !== userType){
            setisLoggedIn(false);
          }
        }
        setAdminData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoggedIn) {
    return (
      <React.Fragment>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2>Admin Dashboard</h2>
            <div className={styles.adminContainer}>
              <Navbar user={state}></Navbar>
              <div id={styles.adminData}>
                <table className={styles.admin_custom_table}>
                  <thead>
                    <tr>
                      <th className={styles.admin_custom_column}>Name</th>
                      <th className={styles.admin_custom_column}>Type Of User</th>
                      <th className={styles.admin_custom_column}>Specilization</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminData.map((item) => (
                      <tr
                        className={styles.admin_custom_rows}
                        key={item._id}>
                        <td className={styles.admin_custom_data}>{item.fullName}</td>
                        <td className={styles.admin_custom_data}>{item.userType}</td>
                        {item.userType === "doctor" && (
                          <td className={styles.admin_custom_data}>
                            {item.specialization}
                          </td>
                        )}
                        {item.userType === "patient" && (
                          <td className={styles.admin_custom_data}>---</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <AuthLoginComponent user="Admin"></AuthLoginComponent>
    );
  }
}


export default AdminDashboard;
