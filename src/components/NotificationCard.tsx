import React, {useState, useEffect} from 'react';
import {Pressable, Text, Box, HStack, Spacer, Badge, Modal} from 'native-base';

interface NotificationCardProps {
  notice: any;
}
const NotificationCard = (props: NotificationCardProps) => {
  const {notice} = props;
  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [data, setData] = useState({
    title: '',
    expiredTime: '',
    content: '',
  });
  useEffect(() => {
    if (notice) {
      const expiredTime = new Date(notice.created_at * 1000);
      setData({
        title: notice.title,
        expiredTime: expiredTime.toLocaleDateString('en-GB'),
        content: notice.content,
      });
    }
  }, [notice]);
  return (
    <Box alignItems="center" flex={1} w="100%">
      <Pressable
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        rounded="8"
        w="96%"
        overflow="hidden"
        borderWidth="1"
        borderColor="coolGray.300"
        maxW="96"
        shadow="3"
        bg="coolGray.100"
        p="2">
        <Box>
          <HStack alignItems="center">
            <Badge
              colorScheme="darkBlue"
              _text={{
                color: 'white',
              }}
              variant="solid"
              rounded="4">
              Thông báo
            </Badge>
          </HStack>
          <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
            {data.title}
          </Text>
          <Text mt="2" fontSize="sm" color="coolGray.700">
            {data.expiredTime}
          </Text>
        </Box>
      </Pressable>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.Header>{data.title}</Modal.Header>
          <Modal.Body>{data.content}</Modal.Body>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default NotificationCard;
