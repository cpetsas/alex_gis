import React from 'react';

function DeleteButton (props) {
    const buttonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '50px',
        height: '50px',
        cursor: 'pointer',
    }

  return (
    <img
      src="https://cdn-icons-png.flaticon.com/512/3221/3221897.png" 
      alt="Bin Button"
      style={buttonStyle}
      onClick={props.onClick}
    />
  );
};

export default DeleteButton;
