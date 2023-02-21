import React, {useState, useEffect} from 'react';
import {
  Box,
  Heading,
  VStack,
  Input,
  Link,
  Button,
  Center,
  Icon,
  Pressable,
  Slide,
  Alert,
  Text,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {registerApi} from '../api/serverApi';

const SignupScreen = () => {
  const [show1, setShow1] = React.useState(false);
  const [isOpenTop, setIsOpenTop] = useState(false);
  const [show2, setShow2] = useState(false);
  const [data, setData] = useState('');
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [email_code, setEmailCode] = useState('');
  const [invite_code, setInviteCode] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const handleRegister = async () => {
    let res: any = null;
    try {
      if (password === password2) {
        res = await registerApi({email, password, email_code, invite_code});
        setData('Sign up success');
      } else {
        setData('Password confirm incorrect');
      }
    } catch (error: any) {
      const warn: string = Object.values(error.response.data.errors)[0];
      setData(warn);
    }
    setIsOpenTop(true);
    setTimeout(() => {
      res && navigation.navigate('Login');
      setIsOpenTop(false);
    }, 2000);
  };
  return (
    <Center w="100%" flex={1} bg="#fff">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Center>
          <Heading
            size="3xl"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}>
            V2RK
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="lg">
            Đăng ký
          </Heading>
        </Center>

        <VStack space={3} mt="5">
          <Input
            onChangeText={email => setEmail(email)}
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="email" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Email"
          />
          {/* <Input
            onChangeText={value => setEmailCode(value)}
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="shield-check" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Xác minh Email"
            InputRightElement={
              <Button size="xs" px="6" rounded="sm" h="full">
                Gửi
              </Button>
            }
          /> */}
          <Input
            onChangeText={value => setPassword(value)}
            type={show1 ? 'text' : 'password'}
            InputRightElement={
              <Pressable onPress={() => setShow1(!show1)}>
                <Icon
                  as={
                    <MaterialCommunityIcons name={show1 ? 'eye' : 'eye-off'} />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder="Mật khẩu"
          />
          <Input
            onChangeText={value => setPassword2(value)}
            type={show2 ? 'text' : 'password'}
            InputRightElement={
              <Pressable onPress={() => setShow2(!show2)}>
                <Icon
                  as={
                    <MaterialCommunityIcons name={show2 ? 'eye' : 'eye-off'} />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder="Xác nhận mật khẩu"
          />
          <Link
            _text={{
              fontSize: 'xs',
              fontWeight: '500',
              color: 'indigo.500',
            }}
            alignSelf="flex-end"
            mt="1">
            Forget Password?
          </Link>
          <Button mt="1" colorScheme="secondary" onPress={handleRegister}>
            Đăng ký
          </Button>
          <Button mt="2" colorScheme="primary" onPress={handleLogin}>
            Đăng nhập
          </Button>
        </VStack>
      </Box>
      <Slide in={isOpenTop} placement="top">
        <Alert
          justifyContent="center"
          status={data === 'Sign up success' ? 'success' : 'error'}
          safeAreaTop={8}>
          <Alert.Icon />
          <Text
            p="2"
            color={data === 'Sign up success' ? 'success.600' : 'error.600'}
            fontWeight="medium">
            {data}
          </Text>
        </Alert>
      </Slide>
    </Center>
  );
};
export default SignupScreen;
