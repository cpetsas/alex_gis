import { Box, Text} from '@chakra-ui/react'
import DeleteButton from '../management/Delete'
import EditButton from '../management/EditButton';
import {useNavigate} from 'react-router-dom';


function Category(props){
    const navigate = useNavigate()

    const categoryStyle = {
        padding: '10px',
        marginBottom: '10px',
        position: 'relative',
      };

    function EditResource () {
        navigate(`/edit/category/${props.info.id}`)
    }

    return(
        <Box p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md" >
            <div style={categoryStyle}>
            <DeleteButton onClick={() => props.deleteResource("category", props.info.id)}/>
            <EditButton onClick={() => EditResource()}/>
                <Text>
                    Category Id: {props.info.id}
                </Text>
                <Text>
                    Name: {props.info.name}
                </Text>
                <Text>
                    Description: {props.info.description}
                </Text>
            </div>
            
        </Box>
    )
}

export default Category;