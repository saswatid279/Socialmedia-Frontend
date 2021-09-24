import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { addComment, likeButtonPressed, loadPost } from "../Posts/postSlice";
import "./posts.css";
import { unwrapResult } from "@reduxjs/toolkit";

export default function Postdetail(){
    const [fetchstatus,setfetchstatus]=useState("idle");
    const [comment, setComment] = useState();
    const dispatch = useDispatch();
    
    const { poststatus, error, post } = useSelector((state) => {
      
         return state.posts
    })
    const {user}=useSelector((state)=>{
        return state.auth;
      })

    function likeHandler(id, Likes) {
        dispatch(likeButtonPressed({ id, Likes }));
      }

      function commentHandler(postId,username,comment){
        setfetchstatus("idle");
        
        (async () => {
          try {
            const result = await dispatch(addComment({postId,username,comment}));
            unwrapResult(result);
            //setfetchstatus("success");
          } catch (error) {
            console.log(error);
            alert("error occured");
          }
        })();
       }
      
       let { pid }=useParams();
       console.log("pid",pid)
       
     
       useEffect(() => {
         if(fetchstatus==="idle"){
          (async () => {
            try {
              const resultAction = await dispatch(loadPost(pid));
              unwrapResult(resultAction);
              setfetchstatus("success");
            } catch (error) {
              console.log(error);
              alert("error occured");
            }
          })();
         }
       })
    

    return (<div className="detail-container">
        { fetchstatus==="idle" && <div>Loading...</div>}
        {poststatus==="error" && <div>{error}</div>}
        {fetchstatus==="success" && <div className="postdetail-container">
                    <article key={post._id}>
                       <div><h4>{post.title}</h4></div>

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
                        
                        {post.comments.length!==0 && post.comments.map((comment)=>{
                            return(<div>
                                    {comment.author} commented {comment.body}
                                </div>) 
                        })}
                      </div>
                    </article>
                  </div>}
                  </div>
    )
}