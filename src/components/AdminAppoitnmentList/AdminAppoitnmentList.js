import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import DialogBox from "../DialogBox/DialogBox";
import styles from './AdminAppoitnmentList.module.css'
import AuthLoginComponent from '../AuthLoginComponent/AuthLoginComponent';

function AdminAppoitnmentList() {
  const [adminAppointmentList, setAdminAppointmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const [userType, setUserType] = useState("admin");
  const { state } = useLocation();
  const [openDialogIndex, setOpenDialogIndex] = useState(null);
  const backendUrl = process.env.BACKEND_API || "https://wellnessforever.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/adminAppointmentList`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (result === "notLoggedIn") {
          setisLoggedIn(false);
        } else {
          if (state.userType !== userType) {
            setisLoggedIn(false);
          }
        }
        setAdminAppointmentList(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openDialog = (index) => {
    setOpenDialogIndex(index);
  };

  const closeDialog = () => {
    setOpenDialogIndex(null);
  };


  if (isLoggedIn) {
    return (
      <React.Fragment>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h2>Admin Dashboard</h2>
            <div className={styles.doctorContainer}>
              <Navbar user={state} />
              <div id={styles.doctorData}>
              {adminAppointmentList.length == 0 ? (
                            <h4 className={styles.noAppoitnment}> No Appointments to display</h4>
                     ) : (                <table className={styles.doctor_custom_table}>
                      <thead>
                        <tr>
                          <th className={styles.custom_column}>Doctor Name:</th>
                          <th className={styles.custom_column}>No. Of Appointments</th>
                          <th className={styles.custom_column}>List of Patients</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminAppointmentList.map((item, index) => (
                          <tr className={styles.doctor_custom_rows} key={item._id}>
                            <td className={styles.doctor_custom_data}>{item.doctorName}</td>
                            <td className={styles.doctor_custom_data}>{item.noOfAppointments}</td>
                            <td className={styles.doctor_custom_data}><button className="btn btn-primary" onClick={() => openDialog(index)}>View Patient Details</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

              </div>
            </div>
          </div>
        )}
        {openDialogIndex !== null && (
          <DialogBox isOpen={true} handleClose={closeDialog} data={adminAppointmentList[openDialogIndex]}  />
        )}
      </React.Fragment>
    );
  } else {
    return (
      <AuthLoginComponent user="Admin"></AuthLoginComponent>
    );
  }
}

export default AdminAppoitnmentList