// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import axios from 'axios';
//
// const axiosBaseQuery = ({ baseUrl } = { baseUrl: '' }) =>
//     async ({ url, method, data }) => {
//         try {
//             const result = await axios({ url: baseUrl + url, method, data })
//             return { data: result.data }
//         } catch (axiosError) {
//             let err = axiosError
//             return {
//                 error: { status: err.response?.status, data: err.response?.data },
//             }
//         }
//     }
//
// export const userProjectsApi = createApi({
//     baseQuery: axiosBaseQuery({
//         baseUrl: 'http://localhost:5000/',
//     }),
//     endpoints(build) {
//         return {
//             query: build.query({query: () => ({url: '/project', method: 'get', data: null}) }),
//         }
//     },
// })
//

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {useSelector} from "react-redux";


export const userApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/project',
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.accessToken;

            console.log(`userApi Token: ${token}`);

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers;
        }
    }),
    endpoints: build => ({
        getUserProjects: build.query({
            query: () => ('/')
        })
    })

});

export const {useGetUserProjectsQuery} = userApi;