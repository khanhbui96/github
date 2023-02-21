import React, {useEffect, useState} from 'react';
import {Box, Heading, Text, Center, Stack, Pressable, Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {platformSpecificSpaceUnits} from 'native-base/lib/typescript/theme/tools';
import {useNavigation} from '@react-navigation/native';
import {Plan} from '../types';

interface PlanCardProps {
  plan: any;
}
const PlanCard = (props: PlanCardProps) => {
  const navigation: any = useNavigation();
  const {plan} = props;

  const [data, setData] = useState({
    name: '',
    title: '',
    transfer: '',
    speed: '',
  });
  useEffect(() => {
    const price = plan.month_price ? plan.month_price : plan.onetime_price;
    const speed = plan.speed_limit ? `${plan.speed_limit}Mbs` : 'Unlimited';
    const title = plan.month_price
      ? `${price / 100} VND/tháng`
      : `${price / 100} VND`;
    setData({
      name: plan.name,
      title: title,
      transfer: plan.transfer_enable,
      speed: speed,
    });
  }, [plan]);
  const handleSelect = () => {
    navigation.navigate('Thiết lập gói', {plan: plan});
  };
  return (
    <Pressable alignItems="center" mt="2" onPress={handleSelect}>
      <Box
        w="96%"
        shadow="3"
        mx="2"
        rounded="lg"
        borderColor="coolGray.200"
        borderWidth="1"
        bg="gray.50">
        <Stack p="4" space={3}>
          <Stack space={2} alignItems="center">
            <Text fontSize="16" bold>
              {data.name}
            </Text>
            <Heading size="lg">{data.title}</Heading>
            <Center flexDirection="row">
              <Icon
                mr="2"
                as={<MaterialCommunityIcons name="database" />}
                size={6}
                color="red.600"
              />
              <Text fontSize="16" bold>
                Lưu lượng: {data.transfer}GB
              </Text>
            </Center>
            <Center flexDirection="row">
              <Icon
                mr="2"
                as={<MaterialCommunityIcons name="speedometer" />}
                size={6}
                color="red.600"
              />
              <Text fontSize="16" bold>
                Tốc độ: {data.speed}
              </Text>
            </Center>
          </Stack>
        </Stack>
      </Box>
    </Pressable>
  );
};

export default PlanCard;
