import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  ScrollView,
  useToast,
} from 'native-base';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import InviteItem from '../components/InviteItem';
import {
  createInviteApi,
  fetchConfigApi,
  fetchInviteApi,
} from '../api/serverApi';

const InviteScreen = () => {
  const toast = useToast();
  const [invites, setInvites] = useState({codes: [], stat: []});
  const [config, setConfig] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const isFocused = useIsFocused();
  const handleCreate = async () => {
    try {
      await setIsLoading(true);
      const {data} = await createInviteApi();
      await setIsLoading(false);
      if (!toast.isActive('create invite')) {
        await toast.show({
          id: 'create invite',
          title: 'Tạo thành công',
        });
      }
    } catch (error: any) {
      console.log(error.response.data);
      await setIsLoading(false);
      await toast.show({
        id: 'create invite',
        title: 'Tạo thất bại. Tối đa 5 code',
      });
    }
  };
  useEffect(() => {
    fetchInviteApi()
      .then(res => {
        setInvites(res.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
    fetchConfigApi()
      .then(res => {
        setConfig(res.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }, [isFocused, isLoading]);
  return (
    <ScrollView>
      <Box alignItems="center">
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
          bg="gray.50">
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Text fontSize="14">Lời mời của tôi</Text>
            </Stack>
            <Stack space={2}>
              <Heading>{`${
                config.commission_distribution_enable
                  ? config.commission_distribution_enable
                  : 0
              } ${config.currency ? config.currency : ''}`}</Heading>
            </Stack>

            <Stack space={2}>
              <Text fontSize="14">Hoa hồng khả dụng</Text>
            </Stack>

            <Stack mb="2.5" mt="1.5" direction="row" space={2}>
              <Button size="sm">Chuyển khoản</Button>
              <Button size="sm" colorScheme="secondary">
                Rút tiền hoa hồng giới thiệu
              </Button>
            </Stack>
          </Stack>
        </Box>

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
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}>
          <Box flexDirection="row" justifyContent="space-between" mx="3" mt="3">
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              Số người đăng ký
            </Text>
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              {invites.stat[0]}
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-between" mx="3" mt="3">
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              Tỷ lệ hoa hồng
            </Text>
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              {invites.stat[3]}
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-between" mx="3" mt="3">
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              Hoa hồng đang xác nhận
            </Text>
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              0
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-between" mx="3" my="3">
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              Hoa hồng tích luỹ
            </Text>
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              0
            </Text>
          </Box>
        </Box>
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
              Quản lý mã mời
            </Text>
            <Button isLoading={isLoading} rounded="full" onPress={handleCreate}>
              Tạo mã mời
            </Button>
          </Box>
          <Box
            pb="2"
            borderBottomWidth="1"
            borderColor="coolGray.200"
            flexDirection="row"
            justifyContent="space-between"
            mx="3"
            alignItems={'center'}>
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              Mã mời
            </Text>
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              Thời gian tạo
            </Text>
          </Box>
          {invites.codes.map((item, index) => (
            <InviteItem code={item} key={index} />
          ))}
        </Box>
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
            <Text color="coolGray.800" fontWeight="600" fontSize="16">
              Hồ sơ hoa hồng
            </Text>
            <Text color="coolGray.800" fontWeight="400" fontSize="16"></Text>
          </Box>
          <Box
            pb="2"
            borderBottomWidth="1"
            borderColor="coolGray.200"
            flexDirection="row"
            justifyContent="space-between"
            mx="3"
            alignItems={'center'}>
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              Thời gian phát hành
            </Text>
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              Tiền hoa hồng
            </Text>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default InviteScreen;
