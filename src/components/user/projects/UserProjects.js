import React from 'react';
import Button from "@mui/material/Button";
import {useGetUserProjectsQuery} from "../../../services/userApi";

const UserProjects = () => {
    const {data, error, isLoading, isSuccess, isError} = useGetUserProjectsQuery();

    const test = () => {
        console.log(data);
    }

    return (
        <div>
            <h1>User Projects</h1>
            <Button variant={'contained'} onClick={test}>Test</Button>
        </div>
    )
}

export default UserProjects;