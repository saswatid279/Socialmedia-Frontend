
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addPost } from "../Posts/postSlice";
import "./usercard.css";
import { loadUserInfo } from "../Auth/authSlice";

import { Link } from "react-router-dom";
export default function Usercard() {
  const [Title, setTitle] = useState();
  const [Content, setContent] = useState();
  const dispatch = useDispatch();
  
  const status = useSelector((state) => {
    console.log("checking user", state.auth.status);
    return state.auth.status;
  });
  const updated=useSelector((state)=>{
    return state.allUsers.updated;
  })
  const user = useSelector((state) => {
    console.log("currentuser",state.auth.user)
    return state.auth.user;
  });
  useEffect(()=>{
    
    if(updated)
    {
      dispatch(loadUserInfo(user._id));
     
    }
  },[updated,dispatch,user._id])

  function ClickHandler(Title, Content, authorId) {
    console.log("param", Title, Content, authorId);
    dispatch(addPost({ Title, Content, authorId }));
  }

  return (
    <div>
      {status === "loading" && <h2>loading</h2>}
      {status === "error" && <h2>Error Occured</h2>}
      {status === "fulfilled" && (
        <article key={user._id}>
          <div className="user-container">
            <div className="left-container">
              <div className="user-img">
                <img src={user.profilePhotoUrl} alt="not available"></img>
              </div>
              <div className="userdetail"> 
                <span>Name: {user.username}</span>
                <span>Bio: {user.userbio}</span>
                <Link to="/followers"><span>Followers: {user.following.length}</span></Link><br></br>
                <Link to="/following"><span>Following: {user.following.length}</span></Link>
              </div>
            </div>
            
            <div className="right-container">
              <input
                className="post-input"
                placeholder="Add title......"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <textarea
                cols="30"
                rows="9"
                className="post-textarea"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                placeholder={"What is on your mind?"}
              />
              <button
                className="post-btn"
                onClick={() => ClickHandler(Title, Content, user._id)}
              >
                Add Post
              </button>
            </div>
            
          </div>
        </article>
      )}
    </div>
  );
}
