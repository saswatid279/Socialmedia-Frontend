import { Routes, Route, NavLink } from "react-router-dom";
import User from "../features/Users/User";
import LandingPage from "../features/Auth/LandingPage";
import Posts from "../features/Posts/Posts";
export default function RoutePath(){
    return(
        <div>
      
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Posts />} />
          {/* <Route path="/product/:productId" element={<Productdetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <PrivateRoute
            path="/address"
            login={userLogin}
            element={<Address />}
          />
          <Route path="*" element={<Nomatch />} /> */}
        </Routes>
      </div>
    );
}