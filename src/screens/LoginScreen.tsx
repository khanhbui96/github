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

import {getAuthApi} from '../api/serverApi';

const LoginScreen = () => {
  const navigation: any = useNavigation();
  const [isOpenTop, setIsOpenTop] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    let res: any = null;
    try {
      res = await getAuthApi({email, password});
      setData('Login Success');
    } catch (error: any) {
      console.log(error.response.data);
      setData(error.response.data.message);
    }
    setIsOpenTop(true);
    setTimeout(() => {
      res && navigation.navigate('Drawer');
      setIsOpenTop(false);
    }, 2000);
  };
  const handleSignup = () => {
    navigation.navigate('Signup');
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
            Đăng nhập
          </Heading>
        </Center>

        <VStack space={3} mt="5">
          <Input
            onChangeText={email => setEmail(email)}
            InputLeftElement={
              <Icon
                as={<MaterialCommunityIcons name="account" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Email"
          />
          <Input
            onChangeText={password => setPassword(password)}
            type={show ? 'text' : 'password'}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    <MaterialCommunityIcons name={show ? 'eye' : 'eye-off'} />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
            placeholder="Password"
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
          <Button mt="2" colorScheme="primary" onPress={handleLogin}>
            Đăng nhập
          </Button>
          <Button mt="1" colorScheme="secondary" onPress={handleSignup}>
            Đăng ký
          </Button>
        </VStack>
      </Box>
      <Slide in={isOpenTop} placement="top">
        <Alert
          justifyContent="center"
          status={data === 'Login Success' ? 'success' : 'error'}
          safeAreaTop={8}>
          <Alert.Icon />
          <Text
            p="2"
            color={data === 'Login Success' ? 'success.600' : 'error.600'}
            fontWeight="medium">
            {data}
          </Text>
        </Alert>
      </Slide>
    </Center>
  );
};
export default LoginScreen;
