import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "./authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./LandingPage.css";

export default function Signup(){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [bio,setBio]=useState("");
    const dispatch=useDispatch();
    const Navigate = useNavigate();

    const { isUserLoggedIn } = useSelector((state) => {
        console.log("here", state.auth);
        return state.auth;
      });
    function clickHandler(Name,Email,Password,Bio){
        console.log("click",Email)
            dispatch(createUser({Name,Email,Password,Bio}))
    }
    useEffect(() => {
        console.log("userlogin"+isUserLoggedIn)
        if (isUserLoggedIn) {
          Navigate("/home");
        }
      }, [isUserLoggedIn, Navigate]);
    return(
        <div className="signup-container">
            <label>
                Username:
                <input className="login-input" type="text"  onChange={(e)=>{setName(e.target.value)}}  placeholder="Enter your username"/>
            </label>
            <label>
                Email:
                <input className="login-input" type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email"/>
            </label>
            <label>
                Password:
                <input className="login-input" type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your password"/>
            </label>
            <label>
                Bio:
                <input className="login-input" type="text" onChange={(e)=>{setBio(e.target.value)}} placeholder="Enter bio"/>
            </label>
            <button className="login-btn" onClick={()=>clickHandler(name,email,password,bio)}>Create account</button>
        </div>
    );
}