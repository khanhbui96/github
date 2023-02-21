import React, {useState, useRef} from 'react';
import {
  Box,
  Heading,
  Text,
  Center,
  Stack,
  Button,
  Modal,
  Spinner,
} from 'native-base';
import ConfigCard from './ConfigCard';
import {Configs} from '../types';
import {NativeModules} from 'react-native';
import {decode} from 'js-base64';

const {RNV2rayModule} = NativeModules;

interface ActionCardProps {
  getAllConfigFromServer: Function;
  importConfigsFromClipboard: Function;
  deleteAllConfig: Function;
  deleteOneConfig: Function;
  selectOneConfig: Function;
  loading: Boolean;
  configs: Configs | undefined;
}
const ActionCard = (props: ActionCardProps) => {
  const ref = useRef();
  const {
    getAllConfigFromServer,
    loading,
    configs,
    importConfigsFromClipboard,
    deleteAllConfig,
    deleteOneConfig,
    selectOneConfig,
  } = props;
  const [ping, setPing] = useState(0);
  const [showModal, setShowModal] = useState(false);

  return (
    <Box alignItems="center">
      <Box
        w="96%"
        maxW="96"
        shadow="3"
        m="2"
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
        <Box>
          <Center
            bg="violet.500"
            _dark={{
              bg: 'violet.400',
            }}
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5">
            PHOTOS
          </Center>
        </Box>
        <Stack p="4">
          <Stack alignItems="center">
            <Heading size="md" ml="-1" my={1}>
              Bảng điều khiển
            </Heading>
            <Button
              flexDirection="column"
              size="md"
              w="100%"
              my={1}
              onPress={() => getAllConfigFromServer()}>
              Đồng bộ từ nhà cung cấp
            </Button>
            <Button
              size="md"
              w="100%"
              onPress={() => importConfigsFromClipboard()}
              my={1}
              colorScheme="secondary">
              Import từ Clipboard
            </Button>
            <Button
              size="md"
              w="100%"
              variant="outline"
              my={1}
              onPress={() => deleteAllConfig()}>
              Xoá tất cả máy chủ
            </Button>
            <Button
              onPress={() => setShowModal(true)}
              size="md"
              w="100%"
              variant="outline"
              my={1}
              colorScheme="secondary">
              {`Danh sách máy chủ (${configs?.length})`}
            </Button>
            <Button
              onPress={() => {
                RNV2rayModule.nativeServerDelay((value: any) => setPing(value));
              }}
              size="md"
              w="100%"
              variant="outline"
              my={1}
              colorScheme="emerald">
              {`Kiểm tra máy chủ hiện tại (${ping}ms)`}
            </Button>
            {loading ? <Spinner pt="2" color="primary.500" /> : null}
          </Stack>
        </Stack>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          _backdrop={{
            _dark: {
              bg: 'coolGray.800',
            },
            bg: 'gray.900',
          }}>
          <Modal.Content w="90%" maxH="60%">
            <Modal.Header alignItems="center">{`Số lượng máy chủ: ${configs?.length}`}</Modal.Header>
            <Modal.Body>
              {configs &&
                configs.map((config, index) => {
                  return (
                    <ConfigCard
                      key={index}
                      config={config}
                      deleteOneConfig={deleteOneConfig}
                      selectOneConfig={selectOneConfig}
                    />
                  );
                })}
            </Modal.Body>
            <Modal.Footer>
              <Button flex="1" onPress={() => getAllConfigFromServer()}>
                Đồng bộ lại từ nhà cung cấp
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Box>
    </Box>
  );
};

export default ActionCard;
