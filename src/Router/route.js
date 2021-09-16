import { Routes, Route } from "react-router-dom";
// import User from "../features/Users/User";
import LandingPage from "../features/Auth/LandingPage";
import Posts from "../features/Posts/Posts";
export default function RoutePath(){
    return(
        <div>
      
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Posts />} />
         
        </Routes>
      </div>
    );
}