import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const logInUser= createAsyncThunk("auth/logInUser",async (Email,Password)=>{
    const response = await axios.post("https://socialmediaapp.saswatidas.repl.co/user/login", {
       email:Email, password: Password
    });
    console.log("in login",response.data)
    return response.data;
  } );

  export const loadUserInfo =createAsyncThunk("auth/loadUserInfo",async (userId)=>{
    const response = await axios.get(`https://socialmediaapp.saswatidas.repl.co/user/${userId}`);
    return response.data;
  } );

  export const createUser= createAsyncThunk("auth/createUser",async ({Name,Email,Password,Bio})=>{
    console.log("creat check",Email)
    const response = await axios.post("https://socialmediaapp.saswatidas.repl.co/user", {
       username:Name,email:Email, password: Password, userbio:Bio
    });
    console.log("in create",response.data)
    return response.data;
  } );

  export const loadFollowers =createAsyncThunk("auth/loadFollowers",async (userId)=>{
    const response = await axios.get(`https://socialmediaapp.saswatidas.repl.co/user/${userId}/followers`);
    return response.data;
  } );

  // export const followUser= createAsyncThunk("allUsers/followUser",async ({userToBeFollowed,CurrentuserId})=>{
  //   // const response = await axios.post(`https://socialmediaapp.saswatidas.repl.co/user/${userToBeFollowed}/${CurrentuserId}`, {
  //   // });
  //   const response = await axios.post("https://socialmediaapp.saswatidas.repl.co/user/follow", {
  //     currentuser:CurrentuserId, user:userToBeFollowed
  //     });
  //   console.log("in follow",response.data)
  //   return response.data;
  // } ,);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status:"idle",
        token: "",
        isUserLoggedIn:false,
        user:null,
        following:[],
        followers:[]
        //updated: false,
    },
    reducers: {
      // updateUser: (state) => {
      //   state.updated=false;
      // },
        
    },
    extraReducers: {
        [logInUser.pending]:(state)=>{
            state.status="loading"
          },
          [logInUser.fulfilled]:(state,action)=>{
            console.log("loader",action.payload.currentUser);
            state.user=action.payload.currentUser;
            state.message=action.payload.message;
            state.token=action.payload.token;
            state.isUserLoggedIn=true;
            console.log("fetch",state.user)
            console.log("message",state.message)
            state.status="fulfilled"
          },
          [logInUser.rejected]:(state,action)=>{
            state.status="error";
            console.log("message",state.message)
          },
          [createUser.pending]:(state)=>{
            state.status="loading"
          },
          [createUser.fulfilled]:(state,action)=>{
            console.log("loader",action.payload.user);
            state.user=action.payload.user;
            
            state.isUserLoggedIn=true;
            console.log("fetch",state.user)
           
            state.status="fulfilled"
          },
          [createUser.rejected]:(state,action)=>{
            state.status="error";
            console.log("message",state.message)
          },
          [loadUserInfo.pending]:(state)=>{
            state.status="loading"
          },
          [loadUserInfo.fulfilled]:(state,action)=>{
            console.log("loader",action.payload.user);
            state.user=action.payload.user;
            console.log("fetch",state.user);
            state.status="fulfilled";
          },
          [loadUserInfo.rejected]:(state,action)=>{
            state.status="error";
            console.log("message",state.message)
          },
          // [followUser.pending]:(state)=>{
          //   state.status="loading"
          // },
          // [followUser.fulfilled]:(state,action)=>{
          //   console.log("loader",action.payload.updatedusr);
          //   //state.user=action.payload.updatedusr
          //   state.status="fulfilled"
          //   state.updated="true"
          // },
          // [followUser.rejected]:(state,action)=>{
          //   state.status="error";
          //   state.error=action.error.message
          // },
          [loadFollowers.pending]:(state)=>{
            state.status="loading"
          },
          [loadFollowers.fulfilled]:(state,action)=>{
            console.log("loadfollowers",action.payload.followers);
            state.followers=action.payload.followers;
            state.following=action.payload.following;
            //console.log("fetch",state.user);
            state.status="fulfilled";
          },
          [loadFollowers.rejected]:(state,action)=>{
            state.status="error";
            console.log("message",state.message)
          },

    }

})

//export const {updateUser} =authSlice.actions;

export default authSlice;