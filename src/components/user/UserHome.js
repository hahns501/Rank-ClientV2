import React from 'react'

import './UserHome.css'
import UserProjects from "./projects/UserProjects";

const UserHome = () =>{
    return(
        <div className={'userhome'}>
                {/*<h1>User Home</h1>*/}
                <UserProjects/>
        </div>
    )
}

export default UserHome;