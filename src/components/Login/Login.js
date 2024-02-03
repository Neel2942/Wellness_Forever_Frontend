import React,{useEffect,useState} from "react";
import {useNavigate,Link} from "react-router-dom";
import "./Login.css";


const Login = () =>{

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

        async function submit(e){
            e.preventDefault();

            
        }

    
    return(
        <div className="Login">
            <h1>Login</h1>
            <form action="POST">
                <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email address" name="" id=""/>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your Password" name="" id=""/>

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