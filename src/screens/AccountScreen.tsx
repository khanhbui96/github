import React, {useEffect, useState} from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Input,
  FormControl,
  ScrollView,
  Switch,
  useToast,
  AlertDialog,
} from 'native-base';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  fetchConfigApi,
  changePasswordApi,
  resetSecurityApi,
} from '../api/serverApi';

const AccountScreen = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const navigation: any = useNavigation();
  const toast = useToast();
  const isFocused = useIsFocused();
  const [config, setConfig] = useState<any>({});
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleReset = async () => {
    try {
      const {data} = await resetSecurityApi();

      if (!toast.isActive('success')) {
        toast.show({
          id: 'reset',
          title: 'Reset thành công',
        });
      }
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async () => {
    try {
      if (newPassword === confirmPassword) {
        const {data} = await changePasswordApi({
          old_password: oldPassword,
          new_password: newPassword,
        });
        if (!toast.isActive('success')) {
          toast.show({
            id: 'confirm',
            title: 'Đổi mật khẩu thành công',
          });
        }
        setTimeout(() => {
          setConfirmPassword('');
          setOldPassword('');
          setNewPassword('');
          navigation.navigate('Trang chủ');
        }, 1500);
      } else {
        if (!toast.isActive('confirm')) {
          toast.show({
            id: 'confirm',
            title: 'Mật khẩu mới xác nhận không khớp',
          });
        }
        //  setData('Password confirm incorrect');
      }
    } catch (error: any) {
      if (!toast.isActive('error')) {
        await toast.show({
          id: 'error',
          title: error.response.data.message,
        });
      }
      //  const warn: string = Object.values(error.response.data.errors)[0];
      //  setData(warn);
    }
  };
  useEffect(() => {
    fetchConfigApi()
      .then(res => {
        setConfig(res.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }, [isFocused]);
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
              <Text fontSize="14">Ví tiền của tôi</Text>
            </Stack>
            <Stack space={2}>
              <Heading>{`${
                config.commission_distribution_enable
                  ? config.commission_distribution_enable
                  : 0
              } ${config.currency ? config.currency : ''}`}</Heading>
            </Stack>

            <Stack space={2}>
              <Text fontSize="14">Số dư tài khoản</Text>
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
            <Text color="coolGray.800" fontWeight="600" fontSize="18">
              Đổi mật khẩu
            </Text>
            <Text color="coolGray.800" fontWeight="400" fontSize="16"></Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-between" mx="3" mt="3">
            <FormControl>
              <FormControl.Label>Mật khẩu cũ</FormControl.Label>
              <Input
                value={oldPassword}
                onChangeText={value => setOldPassword(value)}
              />
            </FormControl>
          </Box>
          <Box flexDirection="row" justifyContent="space-between" mx="3" mt="3">
            <FormControl>
              <FormControl.Label>Mật khẩu mới</FormControl.Label>
              <Input
                value={newPassword}
                onChangeText={value => setNewPassword(value)}
              />
            </FormControl>
          </Box>
          <Box flexDirection="row" justifyContent="space-between" mx="3" my="3">
            <FormControl>
              <FormControl.Label>Xác nhận mật khẩu mới</FormControl.Label>
              <Input
                value={confirmPassword}
                onChangeText={value => setConfirmPassword(value)}
              />
            </FormControl>
          </Box>
          <Box flexDirection="row" justifyContent="space-between" mx="3" my="3">
            <Button px="8" onPress={handleSave}>
              Lưu
            </Button>
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
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}>
          <Box flexDirection="row" justifyContent="space-between" mx="3" mt="3">
            <Text color="coolGray.800" fontWeight="600" fontSize="18">
              Thông báo
            </Text>
            <Text color="coolGray.800" fontWeight="400" fontSize="16"></Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-between" mx="3" mt="3">
            <FormControl.Label>Mail nhắc đến hạn</FormControl.Label>
            <Switch
              defaultIsChecked
              colorScheme="primary"
              size="lg"
              onValueChange={value => console.log(value)}
            />
          </Box>
          <Box flexDirection="row" justifyContent="space-between" mx="3" mt="3">
            <FormControl.Label>Mail nhắc dung lượng</FormControl.Label>
            <Switch
              defaultIsChecked
              colorScheme="primary"
              size="lg"
              onValueChange={value => console.log(value)}
            />
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
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}>
          <Box flexDirection="row" justifyContent="space-between" mx="3" mt="3">
            <Text color="coolGray.800" fontWeight="600" fontSize="18">
              Reset thông tin gói
            </Text>
            <Text color="coolGray.800" fontWeight="400" fontSize="16"></Text>
          </Box>
          <Box
            bg="amber.100"
            mt="2"
            p="2"
            flexDirection="row"
            justifyContent="space-between"
            alignItems={'center'}>
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              Khi liên kết hoặc tài khoản đăng ký của bạn bị rò rỉ và bị người
              khác sử dụng sai mục đích, bạn có thể đặt lại thông tin đăng ký
              của mình tại đây. Tránh những tổn thất không đáng có.
            </Text>
          </Box>
          <Box
            p="2"
            flexDirection="row"
            justifyContent="space-between"
            alignItems={'center'}>
            <Button
              size="md"
              colorScheme="secondary"
              onPress={() => setIsOpen(true)}>
              Reset liên kết
            </Button>
          </Box>
        </Box>
      </Box>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Xác nhận reset thông tin gói?</AlertDialog.Header>
          <AlertDialog.Body>
            Nếu địa chỉ hoặc thông tin gói dịch vụ của bạn bị tiết lộ có thể
            tiến hành thao tác này. Sau khi reset UUID sẽ thay đổi.
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
              <Button onPress={handleReset}>Đồng ý</Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </ScrollView>
  );
};

export default AccountScreen;
