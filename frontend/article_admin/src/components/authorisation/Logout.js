import React from 'react';
import {useNavigate} from 'react-router-dom';


function LogoutButton(props)  {

    const navigate = useNavigate()

    const redirect_to_target = () =>{
        localStorage.setItem("loggedOut", true)
        localStorage.setItem("jwt", null)
        navigate(`/login`)
    }

    const buttonStyle = {
        width: "100%",
        bottom: '20px',
        background: 'red',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
    };

    return (
        <button style={buttonStyle} onClick={redirect_to_target}>
        LOG OUT
        </button>
    );
};

export default LogoutButton;
