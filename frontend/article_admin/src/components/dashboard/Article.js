import { Box, Text} from '@chakra-ui/react'
import DeleteButton from '../management/Delete'
import {useNavigate} from 'react-router-dom';
import EditButton from '../management/EditButton';


function Article(props){
    const navigate = useNavigate()

    const articleStyle = {
        padding: '10px',
        marginBottom: '10px',
        position: 'relative',
      };
    
    function EditResource () {
        navigate(`/edit/article/${props.info.id}`)
    }

    return(
        <Box p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="md" >
            <div style={articleStyle}>
            <DeleteButton onClick={() => props.deleteResource("article", props.info.id)}/>
            <EditButton onClick={() => EditResource()}/>
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