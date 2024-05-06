import { VStack, Box, Text} from '@chakra-ui/react'
import DeleteButton from '../management/Delete'
import {Navigate} from 'react-router-dom';

function Article(props){

    const articleStyle = {
        padding: '10px',
        marginBottom: '10px',
        position: 'relative',
      };

    return(
        <Box p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md" >
            <div style={articleStyle}>
            <DeleteButton onClick={() => props.deleteResource("article", props.info.id)}/>
                <Text>
                    Article Id: {JSON.stringify(props.info.id)}
                </Text>
                <Text>
                    Title: {JSON.stringify(props.info.title)}
                </Text>
                <Text>
                    Summary: {JSON.stringify(props.info.summary)}
                </Text>
                <Text>
                    Content: {JSON.stringify(props.info.content)}
                </Text>
                <Text>
                    Published: {JSON.stringify(props.info.published)}
                </Text>
                <Text>
                    Published Date: {JSON.stringify(props.info.published_date)}
                </Text>
            </div>
        </Box>
    )
}

export default Article