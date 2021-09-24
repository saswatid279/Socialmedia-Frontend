import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment, likeButtonPressed, loadPosts, updatepoststatus } from "../Posts/postSlice";
import "./posts.css";
import Navbar from "../../Components/Navbar/Navbar";
import Usercard from "../Users/UserCard";
import Users from "../Users/Users";
import { useState } from "react";

import { Link } from "react-router-dom";

export default function Posts() {
  const [comment, setComment] = useState();
  // const [showpost,setshowpost]=useState();
  const { status, error, posts } = useSelector((state) => {
    console.log("here", state.posts);
    return state.posts;
  });
  const {user}=useSelector((state)=>{
    return state.auth;
  })

  function likeHandler(id, Likes) {
    console.log("handler", id, Likes);
    dispatch(likeButtonPressed({ id, Likes }));
  }
  const dispatch = useDispatch();

  function commentHandler(postId,username,comment){
   dispatch(addComment({postId,username,comment}))
  }

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadPosts());
    }
  }, [dispatch, status]);

  return (
    <div>
      <div>
        <Navbar />
        <Usercard />
        <div>
          {status === "loading" && <h2>Loading...</h2>}
          {status === "error" && <h2>Error Occured{error}</h2>}
          <div className="main-container">
            {status === "fulfilled" && (
              <div className="leftpost-container">
                <h3>Posts</h3>
                {posts.map((post) => (
                  <div className="post-container">
                    <article key={post._id}>
                      <div>{post.title}</div>

                      <div className="card-img">
                        <div>{post.info}</div>
                      </div>
                      <div className="card-text">
                        <div className="comment">
                          <input
                            onChange={(event) => setComment(event.target.value)}
                            type="text"
                            placeholder="type here..."
                          />
                        </div>
                        {post.likes}❤️
                        <button
                          className="like-btn"
                          onClick={() => likeHandler(post._id, post.likes + 1)}
                        >
                          Like
                        </button>
                        {/* COMMENT */}
                        <button className="like-btn" onClick={()=>commentHandler(post._id,user.username,comment)}>Comment</button>
                        <Link to={`/home/${post._id}`}><button onClick={()=>updatepoststatus()}className="like-btn">View Posts</button></Link>
                        {/* {showpost && <Postdetail post={post} setshowpost={setshowpost} commentHandler={commentHandler} user={user} likeHandler={likeHandler}/>} */}
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            )}{" "}
            <div className="rightuser-container">
              <Users />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
