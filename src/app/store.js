import { configureStore} from "@reduxjs/toolkit";
import { setupListeners} from "@reduxjs/toolkit/query";
import counterReducer from '../components/counter/counterSlice';
import messageReducer from '../components/message/messageSlice';
import authReducer from '../components/user/authSlice';

import {userApi} from "../services/userApi";

export default configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        counter: counterReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
})
