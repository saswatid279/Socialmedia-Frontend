import { useEffect, useState } from "react";
import { logInUser } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //const { state } = useLocation();
  const {  token } = useSelector((state) => {
    console.log("here", state.auth);
    return state.auth;
  });
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  function clickHandler(email, password) {
    dispatch(logInUser(email, password));
  }

  useEffect(() => {

    if (token) {
      Navigate("/home");
      console.log("will do so");
    }
  }, [token, Navigate]);

  return (
    <div class="container">
      <div class="left">
        <img src="pic1.jpg" class="image" alt="not available"/>
      </div>
      <div class="right">
        <h2>Connect</h2>
        <div class="form">
          <label>
            Enter your Email :
            <input className="login-input"
              placeholder="Enter your email....."
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Enter your password:
            <input className="login-input"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="login-btn" onClick={() => clickHandler(email, password)}>Sign in</button>
          Create a new account <button>Sign up</button>
        </div>
      </div>
    </div>
  );
}
