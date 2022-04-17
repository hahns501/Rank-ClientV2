import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from '../../api/Api';

import axios from "axios";

const user = JSON.parse(sessionStorage.getItem("user"))
const accessToken = JSON.parse(sessionStorage.getItem("accessToken"))

export const login = createAsyncThunk(
    "auth/login",
    async (userLoginData, thunkAPI) => {
        try{
            const {data} = await api.loginUser(userLoginData);
            return data;
        }catch(error){
            console.log(error)
            return error
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    sessionStorage.clear()
});


//refresh problem with auth headers
const initialState = user
    ? {user, accessToken, auth: true}
    : {user: null, accessToken: null, auth: null}

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        // [register.fulfilled]: (state, action) => {
        //     state.isLoggedIn = false;
        // },
        // [register.rejected]: (state, action) => {
        //     state.isLoggedIn = false;
        // },
        [login.fulfilled]: (state, action) => {
            state.auth = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.accessToken}`;
        },
        [login.rejected]: (state, action) => {
            state.auth = false;
            state.user = null;
            state.accessToken = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.auth = false;
            state.user = null;
            state.accessToken = null;
        },
    },
});

const { reducer } = authSlice;
export default reducer;