import React, {useEffect, useState} from 'react';
import {Box, Text, Center, FlatList, Pressable} from 'native-base';
import ServerItem from '../components/ServerItem';
import {useIsFocused} from '@react-navigation/native';
import {fetchServerApi} from '../api/serverApi';

interface ServerScreenProps {}
const ServerScreen = (props: ServerScreenProps) => {
  const [servers, setServers] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchServerApi()
      .then(res => {
        setServers(res.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }, [isFocused]);
  return (
    <Box alignItems="center" flex={1}>
      {servers.length ? (
        <Box
          flex={1}
          p="2"
          w="96%"
          maxW="96"
          shadow="3"
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
          <Box
            p="2"
            borderBottomWidth="1"
            borderColor="coolGray.200"
            flexDirection="row"
            justifyContent="space-between"
            px="2"
            bg={false ? 'gray.300' : 'coolGray.100'}>
            <Text flex="2" color="coolGray.800" fontSize="16">
              Tên
            </Text>
            <Center flex="1">
              <Text flex="1" fontSize="14" color="coolGray.700">
                Trạng thái
              </Text>
            </Center>
          </Box>
          <FlatList
            data={servers}
            renderItem={({item}) => <ServerItem server={item} />}
          />
        </Box>
      ) : (
        <Box
          p="2"
          borderBottomWidth="1"
          borderColor="coolGray.200"
          flexDirection="row"
          justifyContent="space-between"
          px="2"
          bg={false ? 'gray.300' : 'coolGray.100'}>
          <Text flex="1" color="coolGray.800" fontSize="16">
            Chưa có node khả dụng, nếu bạn chưa mua gói hoặc đã hết hạn hãy Gia
            hạn
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ServerScreen;
