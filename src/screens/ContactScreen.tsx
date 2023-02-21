import {Box, Text, Button} from 'native-base';
import React from 'react';
import ContactItem from '../components/ContactItem';
import {fetchConfigApi} from '../api/serverApi';

const ContactScreen = () => {
  return (
    <Box
      w="96%"
      maxW="96"
      shadow="3"
      mx="2"
      mt="2"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      bg="gray.50"
      pb="3">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        mx="3"
        my="3"
        alignItems={'center'}>
        <Text color="coolGray.800" fontWeight="400" fontSize="16">
          Lịch sử đơn hàng
        </Text>
        <Button isLoading={false} rounded="full">
          Tạo việc mới
        </Button>
      </Box>
      <Box
        p="2"
        borderBottomWidth="1"
        borderColor="coolGray.200"
        flexDirection="row"
        justifyContent="space-between"
        mx="3">
        <Text mr="2" color="coolGray.800" fontWeight="400" fontSize="16">
          #
        </Text>
        <Text flex={1} color="coolGray.800" fontWeight="400" fontSize="16">
          Chủ đề
        </Text>
        <Text color="coolGray.800" fontWeight="400" fontSize="16">
          Thao tác
        </Text>
      </Box>
      <ContactItem />
      <ContactItem />
      <ContactItem />
    </Box>
  );
};

export default ContactScreen;
