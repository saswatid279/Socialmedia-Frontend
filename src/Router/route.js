import { Routes, Route } from "react-router-dom";
import LandingPage from "../features/Auth/LandingPage";
import Logout from "../features/Auth/Logout";
import Signup from "../features/Auth/signUp";
import Posts from "../features/Posts/Posts";
import Users from "../features/Users/Users";
export default function RoutePath(){
    return(
        <div>
      
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/logout" element={<Logout />} />
         
        </Routes>
      </div>
    );
}