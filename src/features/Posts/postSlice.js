import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loadPosts= createAsyncThunk("posts/loadPosts",async ()=>{
  const response = await axios.get("https://socialmediaapp.saswatidas.repl.co/post");
  return response.data;
} );

export const addPost= createAsyncThunk("posts/addPost",async ({Title,Content,authorId})=>{
   console.log("addpost",Content);
  const response = await axios.post("https://socialmediaapp.saswatidas.repl.co/post", {
    title:Title, authorid:authorId, info:Content
 });
 console.log("in addingpost",response.data)
 return response.data;
} );

export const likeButtonPressed=createAsyncThunk("posts/likeButtonPressed",async ({id,Likes})=>{
  console.log("likes",id,Likes)
 const response = await axios.post(`https://socialmediaapp.saswatidas.repl.co/post/${id}`, {
   likes:Likes
});
console.log("in likepost",response.data)
return response.data;
} );

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
      status:"idle",
      error:null,
      posts: []
    },
    reducers: {
        // likeButtonPressed:(state,action)=>{
        //     const index=state.posts.findIndex((post)=>post.postID===action.payload);
        //     state.posts[index].likes+=1;
        // }
    }
    ,
   extraReducers:{
      [loadPosts.pending]:(state)=>{
        state.status="loading"
      },
      [loadPosts.fulfilled]:(state,action)=>{
        console.log("loader",action.payload.posts);
        state.posts=action.payload.posts;
        console.log("fetch",state.posts)
        state.status="fulfilled"
      },
      [loadPosts.rejected]:(state,action)=>{
        state.status="error";
        state.error=action.error.message
      }
,
      
      [addPost.fulfilled]:(state,action)=>{
        console.log("loader",action.payload.posts);
        state.posts=action.payload.posts;
        state.status="idle";
        console.log("fetch",state.posts)
      },
      [addPost.rejected]:(state,action)=>{
        state.error=action.error.message
      },
      [likeButtonPressed.fulfilled]:(state,action)=>{
        //console.log("loader",action.payload.posts);
        //state.posts=action.payload.posts;
        state.status="idle";
        //console.log("fetch",state.posts)
      },

    }

})
//export const {likeButtonPressed} =postSlice.actions;
export default postSlice