import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from '../../api/Api';

import axios from "axios";

const user = sessionStorage.getItem("user") !== "undefined" ? JSON.parse(sessionStorage.getItem("user")) : {};
const accessToken = sessionStorage.getItem("accessToken") !== "undefined" ? JSON.parse(sessionStorage.getItem("accessToken")) : {};

export const login = createAsyncThunk(
    "auth/login",
    async (userLoginData, thunkAPI) => {
        try{
            const {data} = await api.loginUser(userLoginData);
            return data;
        }catch(error){
            console.log(error);
            alert('Login Failed')
            // thunkAPI.rejectWithValue(error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    console.log('authSlice logout');
    sessionStorage.clear()
});

const setState = () => {
    console.log("Header Setting");
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    return {user, accessToken, auth: true}
}

//refresh problem with auth headers
const initialState = user ? setState : {user: null, accessToken: null, auth: null}



console.log(initialState);
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
            console.log('fart');
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
            console.log('Auth slice logout fulfilled');
            state.auth = false;
            state.user = null;
            state.accessToken = null;
        },
    },
});

const { reducer } = authSlice;
export default reducer;