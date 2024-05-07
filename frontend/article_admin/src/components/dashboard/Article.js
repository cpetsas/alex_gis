import { VStack, Box, Text} from '@chakra-ui/react'
import DeleteButton from '../management/Delete'
import {Navigate} from 'react-router-dom';

function Article(props){

    const articleStyle = {
        padding: '10px',
        marginBottom: '10px',
        position: 'relative',
      };

    console.log(props.info)

    return(
        <Box p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md" >
            <div style={articleStyle}>
            <DeleteButton onClick={() => props.deleteResource("article", props.info.id)}/>
                <Text>
                    Article Id: {props.info.id}
                </Text>
                <Text>
                    Title: {props.info.title}
                </Text>
                <Text>
                    Summary: {props.info.summary}
                </Text>
                <Text>
                    Content: {props.info.content}
                </Text>
                <Text>
                    Published: {JSON.stringify(props.info.published)}
                </Text>
                <Text>
                    Published Date: {JSON.stringify(props.info.published_date)}
                </Text>
                <Text>
                    Author: {props.info.article_author.name} {props.info.article_author.surname}
                </Text>
                <Text>
                    Category: {props.info.article_category.name}
                </Text>
            </div>
        </Box>
    )
}

export default Article