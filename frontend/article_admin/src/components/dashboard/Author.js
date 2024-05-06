import { VStack, Box, Text} from '@chakra-ui/react'
import DeleteButton from '../management/Delete'


function Author(props){

    const authorStyle = {
        padding: '10px',
        marginBottom: '10px',
        position: 'relative',
        };
    

    return(
        <Box p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md" >
            <div style={authorStyle}>
                <DeleteButton onClick={() => props.deleteResource("author", props.info.id)}/>
                <Text>
                    Author Id: {JSON.stringify(props.info.id)}
                </Text>
                <Text>
                    Name: {JSON.stringify(props.info.name)}
                </Text>
                <Text>
                    Surhame: {JSON.stringify(props.info.surname)}
                </Text>
                <Text>
                    Job: {JSON.stringify(props.info.job_description)}
                </Text>
            </div>
        </Box>
    )
}

export default Author;