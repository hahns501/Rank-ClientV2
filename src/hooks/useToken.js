import React, { useState } from 'react';

const useToken = () =>{
    const getToken = () => {
        const userToken = sessionStorage.getItem('token');
        return userToken?.token
    }

    const [token, setToken] = useState();

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken))
        setToken(userToken.token)
    }

    return {
        setToken: saveToken,
        token
    }
}

export default useToken