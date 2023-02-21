import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Pressable, Text, Box, IconButton, Icon, Badge} from 'native-base';
import Clipboard from '@react-native-clipboard/clipboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {decode} from 'js-base64';
import {Config} from '../types';
import {NativeModules} from 'react-native';
import {getPingV2ray} from '../ultils/v2ray';

const {RNV2rayModule} = NativeModules;

interface ConfigCardProps {
  config: Config;
  deleteOneConfig: Function;
  selectOneConfig: Function;
}

const ConfigCard = (props: ConfigCardProps) => {
  const {config, deleteOneConfig, selectOneConfig} = props;
  const data = JSON.parse(decode(config.data));
  const isSelected = config.isSelected;
  const [ping, setPing] = useState(null);
  const log = () => {
    console.log('call from parent');
  };
  const handleCheckPing = () => {
    const configV2ray = getPingV2ray(config.data);
    RNV2rayModule.nativeConfigDelay(configV2ray, (value: any) => {
      setPing(value);
    });
  };

  return (
    <Box alignItems="center" pb="2">
      <Pressable
        maxW="96"
        flexDirection="row"
        onPress={() => selectOneConfig(config)}>
        {({isHovered, isPressed}) => {
          return (
            <Box
              flexDirection="row"
              justifyContent="space-between"
              px="2"
              flex="1"
              bg={isSelected ? 'gray.300' : 'coolGray.100'}
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              }}
              rounded="8"
              shadow={3}
              borderWidth="1"
              borderColor="coolGray.300">
              <Box flex={1}>
                <Text color="coolGray.800" fontWeight="medium" fontSize="14">
                  {data.ps}
                </Text>
                <Text fontSize="12" color="coolGray.700">
                  {data.add}
                </Text>
              </Box>
              <Box
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between">
                <IconButton
                  onPress={() => Clipboard.setString(`vmess://${config.data}`)}
                  icon={
                    <Icon as={MaterialCommunityIcons} name="share-variant" />
                  }
                  borderRadius="full"
                  _icon={{
                    size: 'md',
                  }}
                  _hover={{
                    bg: 'orange.600:alpha.20',
                  }}
                />
                <IconButton
                  isDisabled={isSelected}
                  onPress={() => {
                    deleteOneConfig(config);
                  }}
                  icon={
                    <Icon as={MaterialCommunityIcons} name="delete-forever" />
                  }
                  borderRadius="full"
                  _icon={{
                    color: 'red.500',
                    size: 'md',
                  }}
                  _hover={{
                    bg: 'orange.600:alpha.20',
                  }}
                />
                <IconButton
                  onPress={handleCheckPing}
                  icon={
                    <Badge
                      colorScheme={ping !== '-1' ? 'success' : 'secondary'}
                      rounded="full"
                      variant="solid"
                      alignSelf="flex-end"
                      _text={{
                        fontSize: 6,
                      }}>
                      {ping ? (
                        ping
                      ) : (
                        <Icon
                          color="#fff"
                          as={MaterialCommunityIcons}
                          name="speedometer"
                          size="3"
                        />
                      )}
                    </Badge>
                  }
                  borderRadius="full"
                />
              </Box>
            </Box>
          );
        }}
      </Pressable>
    </Box>
  );
};

export default ConfigCard;
