import {NavLink } from "react-router-dom";
import "./Navbar.css"
export default function Navbar(){
    return(
        <div className="parent-container">
        <nav className="navbar">
          <div className="navbar-left">Home Decor</div>
          <div>
            <NavLink end className="navbar-right" activeStyle={{}} to="/">
              Home
            </NavLink>
            <NavLink
              end
              className="navbar-right"
              activeStyle={{}}
              to="/home"
            >
              Posts
            </NavLink>
            {/* <NavLink className="navbar-right" activeStyle={{}} to="/cart">
              Cart{itemsInCart.length}
            </NavLink>
            <NavLink className="navbar-right" activeStyle={{}} to="/wishlist">
              Wishlist {wishlist.length}
            </NavLink>
            <NavLink className="navbar-right" activeStyle={{}} to="/address">
              Address
            </NavLink>
            <NavLink className="navbar-right" activeStyle={{}} to="/login">
              Login
            </NavLink> */}
            {/* <NavLink className="navbar-right" activeStyle={{}} to="/login">
              Login
            </NavLink> */}
          </div>
        </nav>
      </div>
    )
}