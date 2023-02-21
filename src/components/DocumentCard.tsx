import React, {useEffect, useState} from 'react';
import {Box, Text, Stack, Heading, Pressable} from 'native-base';
import DocumentItem from './DocumentItem';

interface DocumentCardProps {
  knowledge: any;
}
const DocumentCard = (props: DocumentCardProps) => {
  const {knowledge} = props;
  return (
    <Box alignItems="center" flex={1}>
      <Box
        flex={1}
        p="2"
        w="96%"
        maxW="96"
        shadow="3"
        mt="2"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <Stack space={3}>
          <Stack
          //   space={2} alignItems="center"
          >
            <Heading size="md" ml="-1">
              {knowledge[0]}
            </Heading>
          </Stack>
          {knowledge[1].length !== 0 &&
            knowledge[1].map((item: any, index: any) => (
              <DocumentItem key={index} data={item} />
            ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default DocumentCard;
