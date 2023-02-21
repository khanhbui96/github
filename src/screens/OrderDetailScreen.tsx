import React, {useEffect, useState, useRef} from 'react';
import {Box, Text, ScrollView, AlertDialog, Button, Icon} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {orderDetailApi, orderCancellApi, MomoPayApi} from '../api/serverApi';

interface OrderDetailScreenProps {}
const OrderDetailScreen = (props: OrderDetailScreenProps) => {
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const navigation: any = useNavigation();
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const route = useRoute();
  const data: any = route.params;
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [period, setPeriod] = useState('');
  const [transfer, setTransfer] = useState(0);
  const [tradeNo, setTradeNo] = useState('');
  const [time, setTime] = useState('');
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(2);
  const [id, setId] = useState(0);
  const handlePay = async () => {
    navigation.navigate('Thanh toán với Momo', {
      amount: total / 100,
      note: `5GDATA${id}`,
    });
    // const data = await MomoPayApi({amount: total / 100, note: `5GDATA${id}`});
    console.log(data);
  };
  const handleCancel = async () => {
    try {
      const res: any = await orderCancellApi({trade_no: data.trade_no});
      setIsOpen(false);
      await navigation.navigate('Chi tiết đơn hàng', {trade_no: data.trade_no});
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    orderDetailApi({trade_no: data.trade_no})
      .then(res => {
        const {data} = res;
        let valuePeriod;
        switch (data.period) {
          case 'month_price':
            valuePeriod = 'Một tháng';
            break;
          case 'quarter_price':
            valuePeriod = 'Ba tháng';
            break;
          case 'half_year_price':
            valuePeriod = 'Sáu tháng';
            break;
          default:
            valuePeriod = 'Dài hạn';
            break;
        }

        const createTime = new Date(data.created_at * 1000);
        setName(data.plan.name);
        setPeriod(valuePeriod);
        setTransfer(data.plan.transfer_enable);
        setTradeNo(data.trade_no);
        setTime(createTime.toLocaleString('en-GB'));
        setTotal(data.total_amount);
        setPrice(data.plan[data.period]);
        setStatus(data.status);
        setId(data.id);
      })
      .catch(error => console.log(error));
  }, [data]);
  return (
    <Box>
      {status === 2 && (
        <Box
          pb="2"
          mt="2"
          w="96%"
          shadow="3"
          mx="2"
          rounded="lg"
          borderColor="coolGray.200"
          borderWidth="1"
          bg="gray.50">
          <Box justifyContent="center" mx="3" my="3" alignItems={'center'}>
            <Icon
              color={'warning.400'}
              size="20"
              as={<MaterialCommunityIcons name="alert" />}
            />
            <Text color="coolGray.800" fontWeight="600" fontSize="20">
              Đã huỷ
            </Text>
          </Box>
        </Box>
      )}
      {status === 1 && (
        <Box
          pb="2"
          mt="2"
          w="96%"
          shadow="3"
          mx="2"
          rounded="lg"
          borderColor="coolGray.200"
          borderWidth="1"
          bg="gray.50">
          <Box justifyContent="center" mx="3" my="3" alignItems={'center'}>
            <Icon
              color={'success.600'}
              size="20"
              as={<MaterialCommunityIcons name="check-circle" />}
            />
            <Text color="coolGray.800" fontWeight="600" fontSize="20">
              Hoàn thành
            </Text>
          </Box>
        </Box>
      )}
      <ScrollView>
        <Box
          pb="2"
          mt="2"
          w="96%"
          shadow="3"
          mx="2"
          rounded="lg"
          borderColor="coolGray.200"
          borderWidth="1"
          bg="gray.50">
          <Box
            flexDirection="row"
            justifyContent="space-between"
            mx="3"
            my="3"
            alignItems={'center'}>
            <Text color="coolGray.800" fontWeight="600" fontSize="20">
              Thông tin
            </Text>
          </Box>
          <Box
            px="3"
            flexDirection="row"
            justifyContent="space-between"
            alignItems={'center'}>
            <Text fontWeight="400" fontSize="16">
              Tên sản phẩm： {name}
            </Text>
          </Box>
          <Box
            px="3"
            flexDirection="row"
            justifyContent="space-between"
            alignItems={'center'}>
            <Text fontWeight="400" fontSize="16">
              Loại/Chu kỳ： {period}
            </Text>
          </Box>
          <Box
            px="3"
            flexDirection="row"
            justifyContent="space-between"
            alignItems={'center'}>
            <Text fontWeight="400" fontSize="16">
              Dung lượng： {transfer}GB
            </Text>
          </Box>
        </Box>
        <Box
          pb="2"
          mt="2"
          w="96%"
          shadow="3"
          mx="2"
          rounded="lg"
          borderColor="coolGray.200"
          borderWidth="1"
          bg="gray.50">
          <Box
            flexDirection="row"
            justifyContent="space-between"
            mx="3"
            my="3"
            alignItems={'center'}>
            <Text color="coolGray.800" fontWeight="600" fontSize="20">
              Thông tin đơn hàng
            </Text>
            {status === 0 && (
              <Button
                isLoading={false}
                rounded="full"
                bg="warning.700"
                onPress={() => setIsOpen(!isOpen)}>
                Đóng đơn hàng
              </Button>
            )}
          </Box>

          <Box
            px="3"
            flexDirection="row"
            justifyContent="space-between"
            alignItems={'center'}>
            <Text fontWeight="400" fontSize="16">
              Mã đơn hàng： {tradeNo}
            </Text>
          </Box>
          <Box
            px="3"
            flexDirection="row"
            justifyContent="space-between"
            alignItems={'center'}>
            <Text fontWeight="400" fontSize="16">
              Thời gian tạo： {time}
            </Text>
          </Box>
        </Box>
        {status === 0 && (
          <Box
            pb="2"
            mt="2"
            w="96%"
            shadow="3"
            mx="2"
            rounded="lg"
            borderColor="coolGray.200"
            borderWidth="1"
            bg="gray.50">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              mx="3"
              my="3"
              alignItems={'center'}>
              <Text color="coolGray.800" fontWeight="600" fontSize="20">
                Phuơng thức thanh toán
              </Text>
            </Box>

            <Box
              pt="2"
              px="4"
              bg="muted.700"
              flexDirection="row"
              justifyContent="space-between"
              alignItems={'center'}>
              <Text color="light.200" fontWeight="400" fontSize="16">
                Tổng tiền đơn hàng
              </Text>
              <Text color="coolGray.800" fontWeight="400" fontSize="16"></Text>
            </Box>
            <Box
              p="4"
              bg="muted.700"
              borderBottomWidth="1"
              borderColor="coolGray.500"
              flexDirection="row"
              justifyContent="space-between"
              alignItems={'center'}>
              <Text color="light.200" fontWeight="400" fontSize="14">
                {name} x {period}
              </Text>
              <Text color="light.200" fontWeight="400" fontSize="14">
                {VND.format(price / 100)}
              </Text>
            </Box>
            <Box
              pt="2"
              px="4"
              bg="muted.700"
              flexDirection="row"
              justifyContent="space-between"
              alignItems={'center'}>
              <Text color="light.200" fontWeight="400" fontSize="16">
                Tổng
              </Text>
              <Text color="coolGray.800" fontWeight="400" fontSize="16"></Text>
            </Box>
            <Box
              p="4"
              bg="muted.700"
              flexDirection="row"
              justifyContent="space-between"
              alignItems={'center'}>
              <Text color="light.200" fontWeight="400" fontSize="20">
                {VND.format(total / 100)}
              </Text>
            </Box>
            <Box bg="muted.700">
              <Button m="2" onPress={handlePay}>
                Kết toán
              </Button>
            </Box>
            <AlertDialog
              leastDestructiveRef={cancelRef}
              isOpen={isOpen}
              onClose={onClose}>
              <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>Chú Ý </AlertDialog.Header>
                <AlertDialog.Body>
                  Nếu bạn đã thanh toán, việc hủy đơn hàng có thể khiến việc
                  thanh toán không thành công. Bạn có chắc chắn muốn hủy đơn
                  hàng không ?
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="unstyled"
                      colorScheme="coolGray"
                      onPress={onClose}
                      ref={cancelRef}>
                      Huỷ
                    </Button>
                    <Button onPress={handleCancel}>Đồng ý</Button>
                  </Button.Group>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog>
          </Box>
        )}
      </ScrollView>
    </Box>
  );
};

export default OrderDetailScreen;
