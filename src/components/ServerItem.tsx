import React, {useEffect, useState} from 'react';
import {Box, Text, Pressable, Icon, Center} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ServerItemProps {
  server: any;
}
const ServerItem = (props: ServerItemProps) => {
  const {server} = props;
  return (
    <Box alignItems="center">
      <Pressable maxW="100%" flexDirection="row">
        {({isHovered, isPressed}) => {
          return (
            <Box
              p="2"
              flexDirection="row"
              justifyContent="space-between"
              px="2"
              flex="1"
              bg={false ? 'gray.300' : 'coolGray.100'}
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.99 : 1,
                  },
                ],
              }}
              borderBottomWidth="1"
              borderColor="coolGray.200">
              <Text
                flex="2"
                color="coolGray.800"
                fontWeight="medium"
                fontSize="16">
                {server.name}
              </Text>
              <Center flex="1">
                <Icon
                  color={'red.900'}
                  size="4"
                  as={<MaterialCommunityIcons name="circle" />}
                />
              </Center>
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
};

export default ServerItem;
