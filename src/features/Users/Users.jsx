import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { loadUserInfo } from "../Users/userSlice";
import { likeButtonPressed,loadPosts } from "../Posts/postSlice";

export default function Users(){

    const {status,error,user}= useSelector((state)=>{
        console.log("here",state.user)
        return state.user})


    return(<div>
         {status==="loading" && <h2>loading</h2>}
         {status==="error" && <h2>Error Occured{error}</h2>}

        {status==="fulfilled" && users.map((user)=>(
            <article key={user._id}>
            <div>{user.username}</div>
            <button onClick={}>Follow</button>
            {/* <button onClick={}>Unfollow</button> */}
            </article>
            ))}

    </div>);
}