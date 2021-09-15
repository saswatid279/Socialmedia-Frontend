// import { useEffect } from "react";
// import { useSelector,useDispatch } from "react-redux";
// import { loadUserInfo,logInUser } from "../Users/userSlice";
// import Usercard from "./UserCard";
// export default function User(Email,Password){

//     const {status,error,user}= useSelector((state)=>{
//         console.log("here",state.user)
//         return state.user})

//          const dispatch = useDispatch();

//         useEffect(()=>{
//             if(status==="idle")
//             {
//                 console.log("checking status of user",status);
//                 dispatch(logInUser(Email,Password));}
//         },[dispatch,status]);
    


//     return(<div>
//          {status==="loading" && <h2>loading</h2>}
//          {status==="error" && <h2>Error Occured{error}</h2>}

//         {status==="fulfilled" && <Usercard usr={user}/>}

//     </div>);
// }