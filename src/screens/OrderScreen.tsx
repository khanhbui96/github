import React, {useEffect, useState} from 'react';
import {Box, Text, Center, Heading, FlatList} from 'native-base';
import ServerItem from '../components/ServerItem';
import OrderItem from '../components/OrderItem';
import {useIsFocused} from '@react-navigation/native';
import {fetchOrderApi} from '../api/serverApi';

interface OrderScreenProps {}
const OrderScreen = (props: OrderScreenProps) => {
  const [orders, setOrders] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchOrderApi()
      .then(res => {
        setOrders(res.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }, [isFocused]);
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
        <FlatList
          data={orders}
          renderItem={({item}) => <OrderItem order={item} />}
        />
      </Box>
    </Box>
  );
};

export default OrderScreen;
