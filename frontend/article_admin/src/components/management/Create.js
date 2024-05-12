import React from 'react';
import {useNavigate} from 'react-router-dom';


function CreateButton(props)  {

    const navigate = useNavigate()

    const redirect_to_target = () =>{
        navigate(`/create/${props.destination}`)
    }

    const buttonStyle = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'green',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    };

    return (
        <button style={buttonStyle} onClick={redirect_to_target}>
        CREATE
        </button>
    );
};

export default CreateButton;
