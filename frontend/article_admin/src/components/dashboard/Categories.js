import React from 'react';
import { VStack } from '@chakra-ui/react'
import Category from './Category';

function Categories (props) {

  return (
    <VStack spacing={4} align="stretch">
        {props.categories.map((element, index=0) => {
            return(<Category key={element.id} index={index} info={element} rows={1} deleteResource={props.deleteResource}/>)
        })}
    </VStack>
  );
};

export default Categories;
