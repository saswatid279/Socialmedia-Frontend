import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const loadUserInfo= createAsyncThunk("userinfo/loadUserInfo",async (userid)=>{
//   const response = await axios.get("https://socialmediaapp.saswatidas.repl.co/user/`${userid}`");
//   return response.data;
// } );
export const loadAllUsers= createAsyncThunk("userinfo/loadAllUsers",async ()=>{
  const response = await axios.get("https://socialmediaapp.saswatidas.repl.co/user/");
  return response.data;
} );


export const userSlice = createSlice({
    name: 'userinfo',
    status: "idle",
    message: "",
    error:null,
    initialState: {
      //user: [],
      users:[],
    },
    reducers: {
        
    }
    ,
   extraReducers:{
      [loadAllUsers.pending]:(state)=>{
        state.status="loading"
      },
      [loadAllUsers.fulfilled]:(state,action)=>{
        console.log("loader",action.payload.user);
        state.users=action.payload.user;
        //console.log("fetch",state.users)
        state.status="fulfilled"
      },
      [loadAllUsers.rejected]:(state,action)=>{
        state.status="error";
        state.error=action.error.message
      },
     

    }
    

})
//export const {likeButtonPressed} =userSlice.actions;
export default userSlice