import React, {useEffect, useState} from 'react';
// import {useGetUserProjectsQuery} from "../../../services/userApi";

import { useNavigate } from "react-router-dom";

import * as api from '../../../api/Api';
import './UserProjects.css';
import ColoredCircle from "./ColoredCircle";


// Refresh causing auth headers to not be reattached
const UserProjects = () => {
    // const {data, error, isLoading, isSuccess, isError} = useGetUserProjectsQuery();
    const [userData,setUserData] = useState([]);
    let navigate = useNavigate();

    useEffect(async()=>{
        let {data} = await api.getUserProjects();
        setUserData(data);
        console.log(data);
    }, [])

    const statusColor = (status) => {
        if (status){
            return (
                <div>
                    <ColoredCircle color={"#92C353"}/> Complete
                </div>
            )
        }else{
            return (
                <div>
                    <ColoredCircle color={"#febe10"}/> Incomplete
                </div>
            )
        }
    }

    return (
        <div className={'userProjects'}>
            <h1>Projects</h1>
            <table className={'Projects'}>
                <thead>
                <tr>
                    <th>Project Names</th>
                    <th>Created</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {userData.map((val, key) => {
                    return (
                        <tr
                            onClick={val.status ? undefined : () => {navigate(`/project/${val.project_id}`)}}
                            key={key}
                        >
                            <th>{val.project_name}</th>
                            <td>{val.created_at.substring(0, val.created_at.indexOf('T'))}</td>
                            <td>{statusColor(val.status)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )

        // return (
        //     <div className={'UserProjects'}>
        //         <h2> User Projects</h2>
        //         <table id={'Projects'}>
        //             <thead>
        //             <tr>
        //                 <th>Name</th>
        //                 <th>Status</th>
        //                 <th>Assigned</th>
        //                 <th>Due</th>
        //             </tr>
        //             </thead>
        //             <tbody>
        //             {Projects.map((val, key) => {
        //                 return(
        //                     <tr
        //                         onClick={() => {history.push('/projects/rank/' + val.ProjectID)}}
        //                         key = {key}
        //                     >
        //                         <th>
        //                             {val.Name}
        //                         </th>
        //                         <td>
        //                             {statusColor(val.Status)}
        //                             {/*{String(val.Status)}*/}
        //                         </td>
        //                         <td>
        //                             {val.AssignDate}
        //                         </td>
        //                         <td>
        //                             {val.Due}
        //                         </td>
        //
        //                     </tr>
        //
        //                 )
        //             })}
        //             </tbody>
        //         </table>
        //     </div>
        // )
}

export default UserProjects;