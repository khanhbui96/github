import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {testApiAction} from '../store/actions/configs.action';

import axios from 'axios';
const BASE_URL = 'https://5gdatavip.xyz';
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const TestApi = () => {
  const dispatch = useDispatch();
  const email = '08022023@gmail.com';
  const password = '12345678';
  const handlePress = async () => {
    dispatch(testApiAction());
    // console.log('run');
    // const {data} = await api.post('/api/v1/passport/auth/login', {
    //   email,
    //   password,
    // });
    // // const { data } = await api.get(
    // //   "/api/v1/client/subscribe?token=a95034f950048bcd7aa3d332ce4f857e"
    // // );
    // console.log('run2');
    // console.log(data);
  };
  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        style={{padding: 10, backgroundColor: 'blue'}}>
        <Text>TestApi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestApi;
