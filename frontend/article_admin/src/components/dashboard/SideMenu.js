import React, { useState } from 'react';
import { Flex, Box, Tab, Tabs, TabList, TabPanel, TabPanels } from '@chakra-ui/react';

function SideMenu(props) {

  return (
    <Box
    bg="green.200"
    h="100vh"
    overflowY="auto"
    borderRight="1px solid #ccc"
    boxShadow="md"
    position="fixed"
    left="0"
    top="0"
    width="250px">
        <Flex
        direction="column"
        bg="gray.200"
        h="100vh"
        w="250px"
        position="fixed"
        left="0"
        top="0"
        zIndex="100"
        boxShadow="lg"
        overflowY="auto">
            <Box h="100%" mb={4}>
                <Tabs>
                    <Tab w="100%" onClick={() => props.selectTab('article')} >
                        Articles
                    </Tab>
                    <Tab w="100%" onClick={() => props.selectTab('author')} >
                        Authors
                    </Tab>
                    <Tab w="100%" onClick={() => props.selectTab('category')} >
                        Categories
                    </Tab>
                </Tabs>
            </Box>
        </Flex>
    </Box>
  );
};

export default SideMenu;
