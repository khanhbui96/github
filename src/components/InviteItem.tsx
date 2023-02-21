import {Box, Text, Pressable, useToast, useClipboard} from 'native-base';
import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';

interface InviteItemProps {
  code: any;
}
const InviteItem = (props: InviteItemProps) => {
  const {code} = props;
  const toast = useToast();
  const {value, onCopy} = useClipboard();
  const time = new Date(code.created_at * 1000);
  const handleCopy = () => {
    if (!toast.isActive(code.code)) {
      Clipboard.setString(code.code);
      toast.show({
        id: code.code,
        title: 'Sao chép thành công',
      });
    }
  };
  return (
    <Pressable onPress={handleCopy} maxW="100%">
      {({isHovered, isPressed}) => {
        return (
          <Box
            py="2"
            borderBottomWidth="1"
            borderColor="coolGray.200"
            flexDirection="row"
            justifyContent="space-between"
            mx="3"
            style={{
              transform: [
                {
                  scale: isPressed ? 0.98 : 1,
                },
              ],
            }}
            alignItems={'center'}>
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              {code.code}
            </Text>
            <Text color="coolGray.800" fontWeight="400" fontSize="16">
              {time.toLocaleString('en-GB')}
            </Text>
          </Box>
        );
      }}
    </Pressable>
  );
};

export default InviteItem;
