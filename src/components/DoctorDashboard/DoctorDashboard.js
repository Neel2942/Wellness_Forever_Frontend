import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./DoctorDashboard.module.css";
import Navbar from "../Navbar/Navbar";
import DialogBox from "../DialogBox/DialogBox";

function DoctorDashboard() {
  const [doctorData, setDoctorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const [userType, setUserType] = useState("doctor");
  const { state } = useLocation();
  const [openDialogIndex, setOpenDialogIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/doctorDashboard");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (result === "notLoggedIn") {
          setisLoggedIn(false);
        } else {
          if (state !== userType) {
            setisLoggedIn(false);
          }
        }
        setDoctorData(result);
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
            <h2>Doctor Dashboard</h2>
            <div className={styles.doctorContainer}>
              <Navbar userType={state} />
              <div id={styles.doctorData}>
                <table className={styles.doctor_custom_table}>
                  <thead>
                    <tr>
                      <th className={styles.custom_column}>No.</th>
                      <th className={styles.custom_column}>Appointment With</th>
                      <th className={styles.custom_column}>Date</th>
                      <th className={styles.custom_column}>Time</th>
                      <th className={styles.custom_column}>Status</th>
                      <th className={styles.custom_column}>Option</th>
                      <th className={styles.custom_column}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doctorData.map((item, index) => (
                      <tr className={styles.doctor_custom_rows} key={item._id}>
                        <td className={styles.doctor_custom_data}>{item.no}</td>
                        <td className={styles.doctor_custom_data}>{item.appointmentWith}</td>
                        <td className={styles.doctor_custom_data}>{item.date}</td>
                        <td className={styles.doctor_custom_data}>{item.time}</td>
                        <td className={styles.doctor_custom_data}>{item.status}</td>
                        <td className={styles.doctor_custom_data}>
                          <button className='btn btn-danger' type="submit">Cancel</button>
                        </td>
                        <td className={styles.doctor_custom_data}>
                          <button className="btn btn-primary" onClick={() => openDialog(index)}>View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {openDialogIndex !== null && (
          <DialogBox isOpen={true} handleClose={closeDialog} data={doctorData[openDialogIndex]} />
        )}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div>
          <p>Please log in to access the doctor dashboard.</p>
          <Link to='/login'>Login</Link>
        </div>
      </React.Fragment>
    );
  }
}

export default DoctorDashboard;
