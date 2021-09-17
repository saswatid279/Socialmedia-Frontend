import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likeButtonPressed, loadPosts } from "../Posts/postSlice";
import "./posts.css";
import Navbar from "../../Components/Navbar/Navbar";
import Usercard from "../Users/UserCard";
import Users from "../Users/Users";

export default function Posts() {
  const { status, error, posts } = useSelector((state) => {
    console.log("here", state.posts);
    return state.posts;
  });

  function likeHandler(id, Likes) {
    console.log("handler", id, Likes);
    dispatch(likeButtonPressed({ id, Likes }));
  }
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      console.log("checking status", status);
      dispatch(loadPosts());
    }
  }, [dispatch, status]);

  return (
    <div>
      <div>
        <Navbar />
        <Usercard />
        <div>
          {status === "loading" && <h2>loading</h2>}
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
                        {post.likes}❤️
                        <button
                          className="like-btn"
                          onClick={() => likeHandler(post._id, post.likes + 1)}
                        >
                          Like
                        </button>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            )}{" "}
            <div className="rightuser-container">
            <Users/>
            </div>
          </div>
        </div>
          
      </div>
    </div>
  );
}
