import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from '../../api/Api'

// export const createProduct = (product) => async (dispatch) => {
//     console.log("createProduct Action");
//     try{
//         //makes a api request to the backend server to create a post
//         const { data } = await api.createPost(product);
//
//         dispatch({ type: 'CREATE_PRODUCT', payload: data });
//     } catch(error) {
//         console.log(error.message);
//     }
// }

// const { data } = await api.createPost(product);

export const sendMessage = createAsyncThunk(
    'message/sendNewMessage',
    async msg => {
        console.log("Send Message Thunk")
        console.log(msg)
        const response = await api.sendMsg(msg)

        return response.data
    }
)

const messageSlice = createSlice({
    name: 'message',
    initialState: '',
    reducers: {

    },
})