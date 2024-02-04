import React,{useEffect,useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () =>{
    const path = useNavigate();

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

        async function submit(e){
            e.preventDefault();

            const userinfo={
                email,
                password
            };

            try{
                const response  = await axios.post("/login", userinfo);
                if(response.data === 'exists'){
                    path("/login")
                    console.log("User exists");
                }else if (response.data === "incorrectPassword"){
                    console.log("Incorrect Password");

                }else if (response.data === "notexists") {
                    // Redirect to login page or display success message
                  path("/homepage");
                }

            }catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Please try again.");
            }
        }

    return(
        <div className="Login">
            <h1>Login</h1>
            <form action="POST">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email address" name="email" />
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your Password" name="password" />

                <input type="submit" onClick={submit}/>

            </form>
            <br/>
            
            <p>OR</p>
            
            <br/>
            
            <Link to="/signup">Register Here</Link>
        </div>
    )
}
export default Login;