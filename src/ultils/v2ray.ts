import {decode} from 'js-base64';
import {NativeModules} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {vmessExample} from './configExample';

const {RNV2rayModule} = NativeModules;
export const startV2ray = (data: string) => {
  const vmessExample1 = {...vmessExample};
  const config: any = JSON.parse(decode(data));
  vmessExample1.outbounds[0].settings.vnext[0].address = config.add;
  vmessExample1.outbounds[0].settings.vnext[0].port = parseInt(config.port);
  vmessExample1.outbounds[0].settings.vnext[0].users[0].alterId = parseInt(
    config.aid,
  );
  vmessExample1.outbounds[0].settings.vnext[0].users[0].id = config.id;
  vmessExample1.outbounds[0].streamSettings.network = config.net;
  vmessExample1.outbounds[0].streamSettings.wsSettings.headers.Host =
    config.host;
  vmessExample1.outbounds[0].streamSettings.wsSettings.path = config.path;

  RNV2rayModule.nativeStartV2ray(JSON.stringify(vmessExample1));
};
export const stopV2ray = () => {
  RNV2rayModule.nativeStopV2ray();
};
export const getPingV2ray = (data: string) => {
  const vmessExample1 = {...vmessExample};
  const config: any = JSON.parse(decode(data));
  vmessExample1.outbounds[0].settings.vnext[0].address = config.add;
  vmessExample1.outbounds[0].settings.vnext[0].port = parseInt(config.port);
  vmessExample1.outbounds[0].settings.vnext[0].users[0].alterId = parseInt(
    config.aid,
  );
  vmessExample1.outbounds[0].settings.vnext[0].users[0].id = config.id;
  vmessExample1.outbounds[0].streamSettings.network = config.net;
  vmessExample1.outbounds[0].streamSettings.wsSettings.headers.Host =
    config.host;
  vmessExample1.outbounds[0].streamSettings.wsSettings.path = config.path;
  const configString = JSON.stringify(vmessExample1);
  return configString;
};
