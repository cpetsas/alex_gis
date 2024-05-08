import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';


function EditButton (props) {
    return (
        <IconButton
        colorScheme="teal"
        icon={<EditIcon boxSize={40}/>}
        onClick={props.onClick}
        size="lg"
        variant="solid"
        >
        </IconButton>
    );
};

export default EditButton;
