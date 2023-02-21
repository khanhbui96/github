import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, Center} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {NativeModules} from 'react-native';
import store from './src/store';
import {Provider as ReduxProvider, useDispatch} from 'react-redux';
import AppDrawer from './src/AppDrawer';
import LoginScreen from './src/screens/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from './src/screens/SignupScreen';
import SplashScreen from './src/screens/SplashScreen';
import ErrorScreen from './src/screens/ErrorScreen';
const {RNV2rayModule} = NativeModules;
const Stack = createStackNavigator();
function App(): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Drawer" component={AppDrawer} />
            <Stack.Screen name="Error" component={ErrorScreen} />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </ReduxProvider>

    // <SafeAreaView>
    //   {/* <TouchableOpacity
    //     onPress={handleStart}
    //     style={{padding: 20, backgroundColor: '#fff', margin: 5}}>
    //     <Text style={{color: '#000'}}>Press to connect</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     onPress={handleStop}
    //     style={{padding: 20, backgroundColor: '#fff', margin: 5}}>
    //     <Text style={{color: '#000'}}>Press to disconnect</Text>
    //   </TouchableOpacity> */}

    // </SafeAreaView>
  );
}

export default App;
