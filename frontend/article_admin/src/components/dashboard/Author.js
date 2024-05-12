import { Box, Text} from '@chakra-ui/react'
import DeleteButton from '../management/Delete'
import EditButton from '../management/EditButton';
import React from 'react';
import {useNavigate} from 'react-router-dom';


function Author(props){
    const navigate = useNavigate()

    const authorStyle = {
        padding: '10px',
        marginBottom: '10px',
        position: 'relative',
        };
    
    function EditResource () {
        navigate(`/edit/author/${props.info.id}`)
    }
    

    return(
        <Box p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md" >
            <div style={authorStyle}>
                <DeleteButton onClick={() => props.deleteResource("author", props.info.id)}/>
                <EditButton onClick={() => EditResource()}/>
                <Text>
                    Author Id: {props.info.id}
                </Text>
                <Text>
                    Name: {props.info.name}
                </Text>
                <Text>
                    Surhame: {props.info.surname}
                </Text>
                <Text>
                    Job: {props.info.job_description}
                </Text>
            </div>
        </Box>
    )
}

export default Author;