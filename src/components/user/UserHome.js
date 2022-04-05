import React,{useState, useEffect} from 'react'
import InitCornerstone from "../viewer/cornerstone/InitCornerstone";

import './UserHome.css'
import Rank from './Rank'
import UserProjects from "./projects/UserProjects";

import * as api from '../../api/Api'

const UserHome = () =>{
    const [data, setData] = useState(null);

    useEffect(() =>{
        try{
            let temp = api.getImagesByProject(1);
        }catch(err){
            console.log(err);
        }
    },[])


    return(
        <div className={'userhome'}>
            {/*<div className={'viewer'}>*/}
            {/*    <InitCornerstone/>*/}
            {/*</div>*/}
            {/*<div className={'rank'}>*/}
            {/*    <Rank/>*/}
            {/*</div>*/}
            {/*<h1>User Home</h1>*/}
            <div className={'userProjects'}>
                <UserProjects/>
            </div>
        </div>
    )
}

export default UserHome