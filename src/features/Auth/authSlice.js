import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const logInUser= createAsyncThunk("userinfo/logInUser",async (Email,Password)=>{
    const response = await axios.post("https://socialmediaapp.saswatidas.repl.co/user/login", {
       email:Email, password: Password
    });
    console.log("in login",response.data)
    return response.data;
  } );

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status:"idle",
        token: "",
        isUserLoggedIn:false,
        user:null
    },
    reducers: {
        // logout: (state) => {
        //     state.user = null;
        //     state.token = null;
        //     state.status = "IDLE";
        //     localStorage.removeItem("token");
        //   },
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
            // state.message=action.payload.message;
            // state.error=action.error.message
            console.log("message",state.message)
          }

    }

})


export default authSlice;