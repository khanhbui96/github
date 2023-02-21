import {Box, Text, Button} from 'native-base';
import React from 'react';

const TrafficItem = () => (
  <Box
    p="2"
    borderBottomWidth="1"
    borderColor="coolGray.200"
    flexDirection="row"
    justifyContent="space-between"
    mx="3">
    <Text color="coolGray.800" fontWeight="400" fontSize="16">
      2023/02/16
    </Text>
    <Text color="coolGray.800" fontWeight="400" fontSize="16">
      973.01 MB
    </Text>
  </Box>
);
const TrafficScreen = () => {
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
        bg="amber.100"
        p="2"
        flexDirection="row"
        justifyContent="space-between"
        alignItems={'center'}>
        <Text color="coolGray.800" fontWeight="400" fontSize="16">
          Chi tiết dung lượng chỉ lưu dữ liệu của những tháng gần đây để truy
          vấn.
        </Text>
      </Box>
      <Box
        p="2"
        borderBottomWidth="1"
        borderColor="coolGray.200"
        flexDirection="row"
        justifyContent="space-between"
        mx="3">
        <Text color="coolGray.800" fontWeight="400" fontSize="16">
          Thời gian
        </Text>
        <Text color="coolGray.800" fontWeight="400" fontSize="16">
          Lưu lượng
        </Text>
      </Box>
      <TrafficItem />
      <TrafficItem />
      <TrafficItem />
    </Box>
  );
};

export default TrafficScreen;
