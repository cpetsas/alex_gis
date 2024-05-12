import React from 'react';
import { VStack } from '@chakra-ui/react'
import Article from "./Article"


function Articles (props) {

  return (
    <VStack spacing={4} align="stretch">
        {props.articles.map((element, index=0) => {
            return(<Article key={element.id} index={index} info={element} rows={1} deleteResource={props.deleteResource}/>)
        })}
    </VStack>
  );
};

export default Articles;
