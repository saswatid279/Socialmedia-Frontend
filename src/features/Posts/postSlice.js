import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loadPosts= createAsyncThunk("posts/loadPosts",async ()=>{
  const response = await axios.get("https://socialmediaapp.saswatidas.repl.co/post");
  return response.data;
} );
export const loadPost= createAsyncThunk("posts/loadPost",async (postid)=>{
  console.log("loadpost",`https://socialmediaapp.saswatidas.repl.co/post/${postid}`)
  const response = await axios.get(`https://socialmediaapp.saswatidas.repl.co/post/${postid}`);
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

export const addComment=createAsyncThunk("posts/addComment",async ({postId,username,comment})=>{
 const response = await axios.post(`https://socialmediaapp.saswatidas.repl.co/post/${postId}/comment`, {
   body:comment,author:username
});
console.log("in addcomment",response.data)
return response.data;
} );

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
      status:"idle",
      poststatus:"idle",
      error:null,
      posts: [],
      post:[]
    },
    reducers: {
        // likeButtonPressed:(state,action)=>{
        //     const index=state.posts.findIndex((post)=>post.postID===action.payload);
        //     state.posts[index].likes+=1;
        // }
        updatepoststatus: (state) => {
        state.poststatus="idle";
        console.log("updating status",state.poststatus)
      },
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
       
        state.status="idle";
        state.poststatus="idle";
      
      },
      [addComment.pending]:(state)=>{
        state.poststatus="loading"
      },
      [addComment.fulfilled]:(state,action)=>{
        console.log("comment",action.payload.post);
        state.posts.map((post)=>{
            if(post._id===action.payload.post._id)
            return post=action.payload.post;
            return post;
        })
        
        console.log("commentreducer")
        state.poststatus="idle";
      },
      // [addComment.rejected]:(state,action)=>{
      //   state.status="error";
      //   state.error=action.error.message
      // }
      [loadPost.pending]:(state)=>{
        state.poststatus="idle"
      },
      [loadPost.fulfilled]:(state,action)=>{
        console.log("loadpost",action.payload.post);
        state.post=action.payload.post;
        console.log("fetch",state.post)
        state.poststatus="fulfilled"
      },
      [loadPost.rejected]:(state,action)=>{
        state.poststatus="error";
        state.error=action.error.message
      }

    }

})
export const {updatepoststatus} =postSlice.actions;
export default postSlice