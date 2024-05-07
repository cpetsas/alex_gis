import { VStack, Box, Text} from '@chakra-ui/react'
import DeleteButton from '../management/Delete'


function Category(props){

    const categoryStyle = {
        padding: '10px',
        marginBottom: '10px',
        position: 'relative',
      };

    return(
        <Box p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md" >
            <div style={categoryStyle}>
            <DeleteButton onClick={() => props.deleteResource("category", props.info.id)}/>
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