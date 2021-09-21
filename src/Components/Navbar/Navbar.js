import "./Navbar.css";
import { useNavigate } from "react-router";
//import { NavLink } from "react-router-dom";
export default function Navbar() {
  const navigate=useNavigate();
  function logout(){
    navigate("/logout")
  }
  return (
    <div className="parent-container">
      <nav className="navbar">
        <div className="navbar-left">Connect</div>
        <div className="navbar-right">
                <button className="navbar-btn" onClick={logout}>Logout</button>
            </div>
      </nav>
    </div>
  );
}
