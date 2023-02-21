import {Box, Text, Link, Divider, Button} from 'native-base';
import React from 'react';

const ContactItem = () => {
  return (
    <Box
      p="2"
      borderBottomWidth="1"
      borderColor="coolGray.200"
      flexDirection="row"
      alignItems={'center'}
      justifyContent="space-between"
      mx="3">
      <Text mr="2" color="coolGray.800" fontWeight="400" fontSize="16">
        1
      </Text>
      <Text flex={1} color="coolGray.800" fontWeight="400" fontSize="16">
        Chủ đề
      </Text>
      <Box flexDirection="row" h="6">
        <Link onPress={() => console.log('khanh')}>Xem</Link>
        <Divider bg="emerald.500" thickness="2" mx="2" orientation="vertical" />
        <Link>Đóng</Link>
      </Box>
    </Box>
  );
};

export default ContactItem;
