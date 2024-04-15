import React,{useEffect,useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import axios from "axios";
import { configDotenv } from "dotenv";
import styles from "./Login.module.css";
configDotenv();

const Login = () =>{
    const path = useNavigate();
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const [formErrors,setFormErrors] = useState({});
    const backendUrl = process.env.BACKEND_API;
    console.log(process.env);
    const validateForm = ()=> {
        const errors={};
       
        if (!email) {
            errors.email = 'Email is required.';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Invalid email address.';
        }
    
        if (!password) {
            errors.password = 'Password is required.';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
      }

        async function submit(e){
            e.preventDefault();
            if(validateForm()){
                const userinfo={
                    email,
                    password
                };
    
                try{
                    const response  = await axios.post(`${backendUrl}/login`, userinfo);
                    
                    if(response.data[0].userType === 'doctor'){
                        path("/doctorDashboard",{state : response.data[0]})

                    }else if(response.data[0].userType === 'patient'){
                        console.log(response.data[0]);
                        path("/patientDashboard",{state : response.data[0]})

                    }else if(response.data[0].userType === 'admin'){
                        path("/adminDashboard",{state : response.data[0]})

                    }else if (response.data === "incorrectPassword"){
                        console.log("Incorrect Password");
    
                    }else if (response.data === "notExists") {
                        path("/login")
                        console.log("User exists");
                    }
    
                }catch (error) {
                    console.error("Error:", error);
                    alert("Something went wrong. Please try again.");
                }
            }
            
        }

    return(
       <div className={styles.container}>
             <div className={styles.Login}>
            <h1>Login</h1>
            <form action="POST">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email address" name="email" />
                {formErrors.email && <p className={styles.errorMsg} >{formErrors.email}</p>}
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your Password" name="password" />
                {formErrors.password && <p className={styles.errorMsg} >{formErrors.password}</p>}
                <input type="submit" onClick={submit}/>

            </form>
            <br/>
            <p>OR</p> 
            <Link to="/signup">Register Here</Link>
        </div>
       </div>
    )
}
export default Login;