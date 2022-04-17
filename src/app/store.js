import { configureStore} from "@reduxjs/toolkit";
import { setupListeners} from "@reduxjs/toolkit/query";
import authReducer from '../components/user/authSlice';

import {userApi} from "../services/userApi";

export default configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
})
