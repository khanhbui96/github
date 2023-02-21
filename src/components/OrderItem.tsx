import React, {useEffect, useState} from 'react';
import {Box, Text, Pressable, Icon, Center} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

interface OrderItemProps {
  order: any;
}
const OrderItem = (props: OrderItemProps) => {
  const navigation: any = useNavigation();
  const {order} = props;
  const time = new Date(order.created_at * 1000);
  const handleSelect = () => {
    navigation.navigate('Chi tiết đơn hàng', {trade_no: order.trade_no});
  };
  return (
    <Box alignItems="center">
      <Pressable maxW="100%" flexDirection="row" onPress={handleSelect}>
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
              <Box flex="2">
                <Text color="coolGray.800" fontWeight="600" fontSize="16">
                  {order.plan.name}
                </Text>
                <Text color="coolGray.400" fontSize="14">
                  {time.toLocaleString('en-GB')}
                </Text>
              </Box>
              <Center flex="1">
                <Text color="coolGray.800" fontWeight="600" fontSize="16">
                  {order.total_amount}
                </Text>
                <Center flexDirection={'row'}>
                  <Icon
                    mr="2"
                    color={order.status === 2 ? 'coolGray.400' : 'blue.400'}
                    size="2"
                    as={<MaterialCommunityIcons name="circle" />}
                  />
                  <Text color="coolGray.400" fontSize="14">
                    {order.status === 0 && 'Đang chờ'}
                    {order.status === 1 && 'Thành công'}
                    {order.status === 2 && 'Đã huỷ'}
                  </Text>
                </Center>
              </Center>
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
};

export default OrderItem;
