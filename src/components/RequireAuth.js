import React, {useEffect} from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import {useSelector} from "react-redux";

const RequireAuth = ({allowedRoles}) => {
    const { auth } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.auth)
    const location = useLocation();

    return allowedRoles?.includes(user?.role)
        ? <Outlet/>
        : auth
            ? <Navigate to={"/unauthorized"} state={{ from: location }} replace/>
            : <Navigate to={"/login"} state={{ from: location }} replace/>
}

export default RequireAuth;
