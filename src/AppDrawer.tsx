import * as React from 'react';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NativeBaseProvider,
  Box,
  Pressable,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
  Menu,
  Button,
} from 'native-base';
import EncryptedStorage from 'react-native-encrypted-storage';
import HomeScreen from './screens/HomeScreen';
import TestApi from './screens/TestApi';
import {useNavigation} from '@react-navigation/native';
import DocumentScreen from './screens/DocumentScreen';
import PlanScreen from './screens/PlanScreen';
import ServerScreen from './screens/ServerScreen';
import OrderScreen from './screens/OrderScreen';
import InviteScreen from './screens/InviteScreen';
import AccountScreen from './screens/AccountScreen';
import ContactScreen from './screens/ContactScreen';
import TrafficScreen from './screens/TrafficScreen';
import PayScreen from './screens/PayScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import MomoPayScreen from './screens/MomoPayScreen';

const Drawer = createDrawerNavigator();

const screens = [
  {
    name: 'Trang chủ',
    component: HomeScreen,
  },
  {
    name: 'Tài liệu sử dụng',
    component: DocumentScreen,
  },
  {
    name: 'Mua dịch vụ',
    component: PlanScreen,
  },
  {
    name: 'Trạng thái node',
    component: ServerScreen,
  },
  {
    name: 'Đơn hàng của tôi',
    component: OrderScreen,
  },
  {
    name: 'Lời mời của tôi',
    component: InviteScreen,
  },
  {
    name: 'Trung tâm kiểm soát',
    component: AccountScreen,
  },
  {
    name: 'Liên hệ chúng tôi',
    component: ContactScreen,
  },
  {
    name: 'Chi tiết dung lượng',
    component: TrafficScreen,
  },
];
const getIcon = (screenName: string): string => {
  switch (screenName) {
    case 'Trang chủ':
      return 'speedometer';
    case 'Tài liệu sử dụng':
      return 'book-open-variant';
    case 'Mua dịch vụ':
      return 'shopping';
    case 'Trạng thái node':
      return 'check-circle';
    case 'Đơn hàng của tôi':
      return 'format-list-bulleted';
    case 'Lời mời của tôi':
      return 'account-multiple';
    case 'Trung tâm kiểm soát':
      return 'account';
    case 'Liên hệ chúng tôi':
      return 'lifebuoy';
    case 'Chi tiết dung lượng':
      return 'poll';
    default:
      return 'speedometer';
  }
};
const HeaderDrawer = (name: string) => {
  const navigation: any = useNavigation();
  const handleLogout = async () => {
    await EncryptedStorage.removeItem('auth_data');
    navigation.navigate('Login');
  };
  return {
    headerTitle: () => (
      <Text fontSize="20" fontWeight="bold">
        {name}
      </Text>
    ),
    headerRight: () => (
      <Menu
        trigger={triggerProps => {
          return (
            <Button variant="ghost" {...triggerProps}>
              <Icon
                color={'gray.900'}
                size="6"
                as={<MaterialCommunityIcons name="account-circle" />}
              />
            </Button>
          );
        }}>
        <Menu.Item
          onPress={() => navigation.navigate('Trung tâm kiểm soát')}
          flex={1}>
          <Icon
            color={'gray.900'}
            size="4"
            as={<MaterialCommunityIcons name="account" />}
          />
          <Text>Trung tâm kiểm soát</Text>
        </Menu.Item>

        <Menu.Item onPress={handleLogout}>
          <Icon
            color={'gray.900'}
            size="4"
            as={<MaterialCommunityIcons name="arrow-left-circle" />}
          />
          <Text>Đăng xuất</Text>
        </Menu.Item>
      </Menu>
    ),
  };
};
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box alignItems="center">
          <Text fontSize="30" mt="1" color="gray.900" fontWeight="500" bold>
            V2RK
          </Text>
        </Box>
        <VStack>
          <VStack space="1">
            {props.state.routeNames
              .slice(0, 2)
              .map((name: string, index: number) => (
                <Pressable
                  key={index}
                  px="5"
                  py="3"
                  rounded="md"
                  bg={
                    index === props.state.index
                      ? 'rgba(6, 182, 212, 0.1)'
                      : 'transparent'
                  }
                  onPress={event => {
                    props.navigation.navigate(name);
                  }}>
                  <HStack space="7" alignItems="center">
                    <Icon
                      color={
                        index === props.state.index ? 'primary.500' : 'gray.500'
                      }
                      size="5"
                      as={<MaterialCommunityIcons name={getIcon(name)} />}
                    />
                    <Text
                      fontWeight="500"
                      color={
                        index === props.state.index ? 'primary.500' : 'gray.700'
                      }>
                      {name}
                    </Text>
                  </HStack>
                </Pressable>
              ))}
          </VStack>
          <Text fontWeight="500" fontSize="16" px="5" color="gray.500" p="2">
            GÓI DỊCH VỤ
          </Text>
          <VStack space="1">
            {props.state.routeNames
              .slice(2, 4)
              .map((name: string, index: number) => (
                <Pressable
                  key={index}
                  px="5"
                  py="3"
                  rounded="md"
                  bg={
                    index === props.state.index - 2
                      ? 'rgba(6, 182, 212, 0.1)'
                      : 'transparent'
                  }
                  onPress={event => {
                    props.navigation.navigate(name);
                  }}>
                  <HStack space="7" alignItems="center">
                    <Icon
                      color={
                        index === props.state.index - 2
                          ? 'primary.500'
                          : 'gray.500'
                      }
                      size="5"
                      as={<MaterialCommunityIcons name={getIcon(name)} />}
                    />
                    <Text
                      fontWeight="500"
                      color={
                        index === props.state.index - 2
                          ? 'primary.500'
                          : 'gray.700'
                      }>
                      {name}
                    </Text>
                  </HStack>
                </Pressable>
              ))}
          </VStack>
          <Text fontWeight="500" fontSize="16" px="5" color="gray.500" p="2">
            TÀI CHÍNH
          </Text>
          <VStack space="1">
            {props.state.routeNames
              .slice(4, 6)
              .map((name: string, index: number) => (
                <Pressable
                  key={index}
                  px="5"
                  py="3"
                  rounded="md"
                  bg={
                    index === props.state.index - 4
                      ? 'rgba(6, 182, 212, 0.1)'
                      : 'transparent'
                  }
                  onPress={event => {
                    props.navigation.navigate(name);
                  }}>
                  <HStack space="7" alignItems="center">
                    <Icon
                      color={
                        index === props.state.index - 4
                          ? 'primary.500'
                          : 'gray.500'
                      }
                      size="5"
                      as={<MaterialCommunityIcons name={getIcon(name)} />}
                    />
                    <Text
                      fontWeight="500"
                      color={
                        index === props.state.index - 4
                          ? 'primary.500'
                          : 'gray.700'
                      }>
                      {name}
                    </Text>
                  </HStack>
                </Pressable>
              ))}
          </VStack>
          <Text fontWeight="500" fontSize="16" px="5" color="gray.500" p="2">
            NGƯỜI DÙNG
          </Text>
          <VStack space="1">
            {props.state.routeNames
              .slice(6, 9)
              .map((name: string, index: number) => (
                <Pressable
                  key={index}
                  px="5"
                  py="3"
                  rounded="md"
                  bg={
                    index === props.state.index - 6
                      ? 'rgba(6, 182, 212, 0.1)'
                      : 'transparent'
                  }
                  onPress={event => {
                    props.navigation.navigate(name);
                  }}>
                  <HStack space="7" alignItems="center">
                    <Icon
                      color={
                        index === props.state.index - 6
                          ? 'primary.500'
                          : 'gray.500'
                      }
                      size="5"
                      as={<MaterialCommunityIcons name={getIcon(name)} />}
                    />
                    <Text
                      fontWeight="500"
                      color={
                        index === props.state.index - 6
                          ? 'primary.500'
                          : 'gray.700'
                      }>
                      {name}
                    </Text>
                  </HStack>
                </Pressable>
              ))}
          </VStack>

          <Text fontWeight="500" fontSize="16" px="5" color="red.500" p="2">
            Status: Activated
          </Text>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}

function AppDrawer() {
  const navigation: any = useNavigation();
  const [shouldOverlapWithTrigger] = React.useState(false);
  const handleLogout = async () => {
    await EncryptedStorage.removeItem('auth_data');
    navigation.navigate('Login');
  };
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        backBehavior="history"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        {screens.map((screen, index) => (
          <Drawer.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={HeaderDrawer(screen.name)}
          />
        ))}
        <Drawer.Screen
          name="Thiết lập gói"
          component={PayScreen}
          options={HeaderDrawer('Thiết lập gói')}
        />
        <Drawer.Screen
          name="Chi tiết đơn hàng"
          component={OrderDetailScreen}
          options={HeaderDrawer('Chi tiết đơn hàng')}
        />
        <Drawer.Screen
          name="Thanh toán với Momo"
          component={MomoPayScreen}
          options={HeaderDrawer('Thanh toán với Momo')}
        />
      </Drawer.Navigator>
    </Box>
  );
}
export default AppDrawer;
