import React, {useEffect, useState} from 'react';
import {
  Box,
  Radio,
  Text,
  Center,
  Input,
  AlertDialog,
  Button,
} from 'native-base';
import {saveOrderApi} from '../api/serverApi';
import {useNavigation} from '@react-navigation/native';
import numeral from 'numeral';

interface PayItemProps {
  plan: any;
}
const PayItem = (props: PayItemProps) => {
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const navigation: any = useNavigation();
  const {plan} = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const {
    name,
    month_price,
    quarter_price,
    half_year_price,
    capacity_limit,
    onetime_price,
    id,
  } = plan;

  const [value, setValue] = useState(onetime_price ? 'Dài hạn' : 'Một tháng');
  const [price1, setPrice1] = useState(0);
  const handleOrder = async () => {
    let period;
    switch (value) {
      case 'Một tháng':
        period = 'month_price';
        break;
      case 'Ba tháng':
        period = 'quarter_price';
        break;
      case 'Sáu tháng':
        period = 'half_year_price';
        break;
      default:
        period = 'onetime_price';
        break;
    }

    try {
      setIsOpen(false);
      const {data} = await saveOrderApi({period, plan_id: id});
      await navigation.navigate('Chi tiết đơn hàng', {trade_no: data});
    } catch (error) {}
  };
  useEffect(() => {
    value === 'Một tháng' && setPrice1(month_price);
    value === 'Ba tháng' && setPrice1(quarter_price);
    value === 'Sáu tháng' && setPrice1(half_year_price);
    value === 'Dài hạn' && setPrice1(onetime_price);
  }, [plan, value]);
  return (
    <Box
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
        <Text color="coolGray.800" fontWeight="600" fontSize="16">
          Chu kỳ thanh toán
        </Text>
        <Text color="coolGray.800" fontWeight="400" fontSize="16"></Text>
      </Box>

      <Box mx="3">
        {!onetime_price ? (
          <Radio.Group
            onChange={value => {
              setValue(value);
            }}
            defaultValue="Một tháng"
            name="Chu ky"
            accessibilityLabel="select prize">
            <Radio value="Một tháng" my={1}>
              <Box flexDirection="row" w="90%" justifyContent="space-between">
                <Text fontSize="16">Một tháng</Text>
                <Text fontSize="16">{VND.format(month_price / 100)}</Text>
              </Box>
            </Radio>
            <Radio value="Ba tháng" my={1}>
              <Box flexDirection="row" w="90%" justifyContent="space-between">
                <Text fontSize="16">Ba tháng</Text>
                <Text fontSize="16">{VND.format(quarter_price / 100)}</Text>
              </Box>
            </Radio>
            <Radio value="Sáu tháng" my={1}>
              <Box flexDirection="row" w="90%" justifyContent="space-between">
                <Text fontSize="16">Sáu tháng</Text>
                <Text fontSize="16">{VND.format(half_year_price / 100)}</Text>
              </Box>
            </Radio>
          </Radio.Group>
        ) : (
          <Radio.Group
            onChange={value => {
              setValue(value);
            }}
            defaultValue="Dài hạn"
            name="Dài hạn"
            accessibilityLabel="select prize">
            <Radio value="Dài hạn" my={1}>
              <Box flexDirection="row" w="90%" justifyContent="space-between">
                <Text fontSize="16">Dài hạn</Text>
                <Text fontSize="16">{onetime_price} Đ</Text>
              </Box>
            </Radio>
          </Radio.Group>
        )}
      </Box>
      <Box
        p="2"
        bg="muted.700"
        borderBottomWidth="1"
        borderColor="coolGray.500"
        flexDirection="row"
        justifyContent="space-between"
        alignItems={'center'}>
        <Input
          variant="unstyled"
          placeholder="Mã giảm giá"
          w="50%"
          fontSize="16"
          color="light.200"
        />
        <Button
          isLoading={false}
          isLoadingText="Đang xác minh"
          onPress={() => console.log('hello world')}>
          Xác minh
        </Button>
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
          {name} x {value}
        </Text>
        <Text color="light.200" fontWeight="400" fontSize="14">
          {VND.format(price1 / 100)}
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
          {VND.format(price1 / 100)}
        </Text>
      </Box>
      <Box bg="muted.700">
        <Button
          m="2"
          onPress={() => setIsOpen(!isOpen)}
          disabled={capacity_limit < 0 ? true : false}>
          {capacity_limit < 0 ? 'Không khả dụng' : 'Đặt hàng'}
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
            Việc thay đổi gói dịch vụ sẽ thay thế gói hiện tại bằng gói mới, xin
            lưu ý.
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
              <Button onPress={handleOrder}>Đồng ý</Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Box>
  );
};

export default PayItem;
