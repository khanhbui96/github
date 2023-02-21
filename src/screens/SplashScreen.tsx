import {Center, Box, Heading} from 'native-base';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ActiveAppApi} from '../api/serverApi';

const SplashScreen = () => {
  const navigation: any = useNavigation();
  useEffect(() => {
    const getAuthLocal = async () => {
      const authData = await EncryptedStorage.getItem('auth_data');
      return authData;
    };
    getAuthLocal().then((authData: string | null) => {
      ActiveAppApi()
        .then(res => {
          if (res.isActive === 'true') {
            authData
              ? navigation.navigate('Drawer')
              : navigation.navigate('Login');
          } else navigation.navigate('Error');
        })
        .catch(error => {
          console.log(error);
        });
    });
  }, []);
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
          <Heading mt="1" color="error.600" fontWeight="medium" size="lg">
            Uy tín tạo niềm tin
          </Heading>
        </Center>
      </Box>
    </Center>
  );
};

export default SplashScreen;
