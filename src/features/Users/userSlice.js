import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const loadAllUsers= createAsyncThunk("allUsers/loadAllUsers",async ()=>{
  const response = await axios.get("https://socialmediaapp.saswatidas.repl.co/user/");
  return response.data;
} );

export const followUser= createAsyncThunk("allUsers/followUser",async ({userToBeFollowed,CurrentuserId})=>{
  const response = await axios.post(`https://socialmediaapp.saswatidas.repl.co/user/${userToBeFollowed}/${CurrentuserId}`, {
  });
  console.log("in login",response.data)
  return response.data;
} ,);

export const userSlice = createSlice({
    name: 'allUsers',  
    initialState: {
    status: "idle",
    updated: false,
    error:null,
      users:[],
    },
    reducers: {
      updateUser: (state) => {
            state.updated=false;
          },
    }
    ,
   extraReducers:{
      [loadAllUsers.pending]:(state)=>{
        state.status="loading"
      },
      [loadAllUsers.fulfilled]:(state,action)=>{
        console.log("loader",action.payload.user);
        state.users=action.payload.user;
        state.status="fulfilled"
      },
      [loadAllUsers.rejected]:(state,action)=>{
        state.status="error";
        state.error=action.error.message
      },
      [followUser.pending]:(state)=>{
        state.status="loading"
      },
      [followUser.fulfilled]:(state,action)=>{
        console.log("loader",action.payload.user);
        state.status="fulfilled"
        state.updated="true"
      },
      [followUser.rejected]:(state,action)=>{
        state.status="error";
        state.error=action.error.message
      },

    }
    

})
export const {updateUser} =userSlice.actions;
export default userSlice;