import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function AuthService(handleFailedAuth){
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            console.log(process.env.be_api)
            const response = await fetch(`${process.env.REACT_APP_API}login/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.user_token;
            localStorage.setItem("jwt", token)
            localStorage.setItem("loggedOut", false)
            navigate("/dashboard")
        } else {
            handleFailedAuth()
            console.error('Authentication failed');
        }
        } catch (error) {
        console.error('Login error:', error);
        }
    };

    return { login };
    };

export default AuthService;
