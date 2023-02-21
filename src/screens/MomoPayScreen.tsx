import {useRoute} from '@react-navigation/native';
import {Center, Image, Box, Link} from 'native-base';
import React from 'react';
import {phone} from '../api/5gDataVip';

const MomoPayScreen = () => {
  const route = useRoute();
  const data = route.params;
  return (
    <Box flex={1}>
      <Center flex={1}>
        <Image
          source={{
            uri: `https://momosv3.apimienphi.com/api/QRCode?phone=${phone}&amount=${data.amount}&note=${data.note}`,
          }}
          p="2"
          alt="Alternate Text"
          size="2xl"
          resizeMode="contain"
        />
        <Link
          href={`https://nhantien.momo.vn/${phone}/${data.amount}`}
          _text={{color: 'cyan.500'}}>
          Mở app Momo
        </Link>
      </Center>
    </Box>
  );
};

export default MomoPayScreen;
