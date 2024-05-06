import React from 'react';

function DeleteButton (props) {
    const buttonStyle = {
        position: 'absolute', // Position the button relative to its closest positioned ancestor
        top: '10px', // Distance from the top edge of the parent container
        right: '10px', // Distance from the right edge of the parent container
        width: '50px', // Button width
        height: '50px', // Button height
        cursor: 'pointer', // Show pointer cursor on hover
    }

  return (
    <img
      src="https://cdn-icons-png.flaticon.com/512/3221/3221897.png" 
      alt="Red Bin Button"
      style={buttonStyle}
      onClick={props.onClick}
    />
  );
};

export default DeleteButton;
