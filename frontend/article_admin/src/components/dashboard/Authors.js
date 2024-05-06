import React from 'react';
import { VStack, Container, Flex, IconButton } from '@chakra-ui/react'
import Author from "./Author"


function Authors (props) {

    return (
        <VStack spacing={4} align="stretch">
            {props.authors.map((element, index=0) => {
                return(<Author key={element.id} index={index} info={element} rows={1} deleteResource={props.deleteResource}/>)
            })}
        </VStack>
    );
};

export default Authors;
