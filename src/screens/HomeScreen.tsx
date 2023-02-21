import React, {useState, useEffect} from 'react';
import {Box, ScrollView, Icon, Fab, useToast, Button} from 'native-base';
import ServicePackCard from '../components/ServicePackCard';
import NotificationCard from '../components/NotificationCard';
import ActionCard from '../components/ActionCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {startV2ray, stopV2ray} from '../ultils/v2ray';
import {NativeModules} from 'react-native';

const {RNV2rayModule} = NativeModules;

import {
  getAllConfigsAPIAction,
  getAllConfigsLocalAction,
  importConfigsClipboardAction,
  deleteAllConfigsAction,
  deleteOneConfigAction,
  selectOneConfigAction,
} from '../store/actions/configs.action';
import {
  selectConfigsState,
  selectConfigSelected,
} from '../store/selectors/configs.selector';
import {Config} from '../types';
import {getSubscribeApi, getNoticeApi} from '../api/serverApi';
import Notification from '../components/Notification';
const getSubscribe = async () => {
  return await getSubscribeApi();
};
const getNotice = async () => {
  return await getNoticeApi();
};
const HomeScreen = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {configs, loading} = useSelector(selectConfigsState);
  const configSelected = useSelector(selectConfigSelected);
  const [infor, setInfor] = useState(null);
  const [notices, setNotices] = useState(null);
  const [isRun, setIsRun] = useState(false);
  const handlePressRun = () => {
    if (configSelected?.length) {
      !isRun && startV2ray(configSelected[0].data);
      !isRun &&
        toast.show({
          title: 'Kết nối thành công',
        });
      !isRun && setIsRun(true);
      isRun && stopV2ray();
      isRun &&
        toast.show({
          title: 'Ngắt kết nối',
        });
      isRun && setIsRun(false);
    } else {
      toast.show({
        title: 'Chưa có máy chủ được chọn',
      });
    }
  };
  const getAllConfigFromServer = () => {
    dispatch(getAllConfigsAPIAction());
  };
  const importConfigsFromClipboard = () => {
    dispatch(importConfigsClipboardAction());
  };
  const deleteAllConfig = () => {
    dispatch(deleteAllConfigsAction());
  };
  const deleteOneConfig = (config: Config) => {
    dispatch(deleteOneConfigAction(config));
  };
  const selectOneConfig = (config: Config) => {
    dispatch(selectOneConfigAction(config));
  };
  useEffect(() => {
    dispatch(getAllConfigsLocalAction());
    getSubscribe()
      .then(data => {
        delete data.plan.content;
        setInfor(data);
      })
      .catch(error => console.log(error));
    getNotice()
      .then(data => {
        setNotices(data);
      })
      .catch(error => console.log(error));
    RNV2rayModule.nativeGetStatusSocket((value: any) => setIsRun(value));
  }, []);
  return (
    <Box flex={1}>
      <ScrollView>
        <Notification notices={notices} />
        <ServicePackCard infor={infor} />
        <ActionCard
          importConfigsFromClipboard={importConfigsFromClipboard}
          getAllConfigFromServer={getAllConfigFromServer}
          deleteAllConfig={deleteAllConfig}
          deleteOneConfig={deleteOneConfig}
          selectOneConfig={selectOneConfig}
          loading={loading}
          configs={configs}
        />
      </ScrollView>
      <Fab
        onPress={handlePressRun}
        renderInPortal={false}
        shadow={2}
        right={5}
        bottom={5}
        bg={isRun ? 'secondary.600' : 'primary.600'}
        size="16"
        icon={
          <Icon
            color="white"
            as={MaterialCommunityIcons}
            name={isRun ? 'square' : 'play'}
            size={isRun ? '6' : '10'}
          />
        }
      />
    </Box>
  );
};

export default HomeScreen;
