import React, {useEffect, useState} from 'react';
// import {useGetUserProjectsQuery} from "../../../services/userApi";

import * as api from '../../../api/Api'

import './UserProjects.css'
// Refresh causing auth headers to not be reattached

const UserProjects = () => {
    // const {data, error, isLoading, isSuccess, isError} = useGetUserProjectsQuery();
    const [userData,setUserData] = useState([]);

    useEffect(async()=>{
        let {data} = await api.getUserProjects();
        setUserData(data);
    }, [])

    return (
        <div>
            <table id={'Projects'}>
                <thead>
                <tr>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {userData.map((val, key) => {
                    return (
                        <tr
                            onClick={() => {
                                console.log(val.project_id)
                            }}
                            key={key}
                        >
                            <th>{val.project_name}</th>
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