import React, {useEffect, useState} from 'react';
import {Box, Heading, Text, Center, Stack, Progress} from 'native-base';

interface ServiePackCardProps {
  infor: any;
}
const ServicePackCard = (props: ServiePackCardProps) => {
  const {infor} = props;
  const now = Date.now();
  const [data, setData] = useState({
    name: 'Chưa có gói dịch vụ',
    expiredTime: 'Vui lòng mua các gói dịch vụ',
    transferEnable: 0,
    transferUse: 0,
  });
  useEffect(() => {
    if (infor && infor.plan) {
      const {plan: any} = infor;
      const expiredTime = new Date(infor.expired_at * 1000);
      setData({
        name: infor.plan.name,
        expiredTime:
          infor.expired_at * 1000 > now
            ? `Hết hạn vào ngày ${expiredTime.toLocaleString('en-GB')} `
            : 'Tài khoản hết hạn',
        transferEnable: (infor.transfer_enable * 9.31) / 10000000000,
        transferUse: (infor.d * 9.31) / 10000000000,
      });
    }
  }, [infor]);
  return (
    <Box alignItems="center">
      <Box
        w="96%"
        maxW="96"
        shadow="3"
        mx="2"
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
        <Stack p="4" space={3}>
          <Stack space={2} alignItems="center">
            <Heading size="md" ml="-1">
              Gói dịch vụ của tôi
            </Heading>
            <Text fontSize="16" bold>
              {data.name}
            </Text>
            <Text fontSize="xs">{data.expiredTime}</Text>

            <Box w="100%" maxW="600">
              <Progress
                value={(data.transferUse / data.transferEnable) * 100}
                mx="2"
              />
            </Box>
            <Text fontSize="14" bold>
              Đã sử dụng {Math.round(data.transferUse)} GB/ Tổng dung lượng{' '}
              {Math.round(data.transferEnable)} GB
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ServicePackCard;
