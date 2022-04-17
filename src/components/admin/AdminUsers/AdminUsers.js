// import React from 'react';
//
// const AdminUsers = () => {
//     return (
//         <div>
//             <h1>Show Users</h1>
//         </div>
//     )
// }
//
// export default AdminUsers;


import React, {useEffect, useState} from "react";
import MaterialTable, { Column } from "@material-table/core";
import DeleteIcon from '@mui/icons-material/Delete';
import * as api from '../../../api/Api'

const lookup = { true: "Available", false: "Unavailable" };

const AdminUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(async()=>{
        let {data} = await api.getAllUsers();
        setUsers(data);
        console.log(data);
    }, [])

    const columns = [
        { title: "First Name", field: "first_name" },
        { title: "Last Name", field: "last_name" },
        { title: "Position", field: "job_position" }
    ];

    return (
        <MaterialTable
            columns={columns}
            data={users}
            title={"Users"}
            options={{
                selection: true
            }}
            actions={[
                {
                    tooltip: 'Remove All Selected Users',
                    icon: () => <DeleteIcon/>,
                    onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                }
            ]}
        />
    )
}

export default AdminUser;