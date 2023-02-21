import React, {useEffect, useState} from 'react';
import {
  Box,
  Text,
  Actionsheet,
  useDisclose,
  Pressable,
  ScrollView,
  Link,
} from 'native-base';
import {getKnowledgeItemApi} from '../api/serverApi';

interface DocumentItemProps {
  data: any;
}
const DocumentItem = (props: DocumentItemProps) => {
  const {data} = props;
  const title: string = data.title;
  const time = new Date(data.updated_at * 1000);
  const [content, setContent] = useState('');
  const [link, setLink] = useState('https://google.com');
  const {isOpen, onOpen, onClose} = useDisclose();
  const getKnowledge = async () => {
    try {
      const knowledge = await getKnowledgeItemApi({
        id: data.id,
        language: 'vi-VN',
      });
      const myRe = /(?=https:).*/g;
      const link: any = myRe.exec(knowledge.body);
      link && (await setLink(link[0]));
      await setContent(knowledge.body);
      await onOpen();
    } catch (error) {
      console.log({newError: error});
    }
  };
  return (
    <Box alignItems="center">
      <Pressable maxW="100%" flexDirection="row" onPress={getKnowledge}>
        {({isHovered, isPressed}) => {
          return (
            <Box
              flexDirection="row"
              justifyContent="space-between"
              px="2"
              flex="1"
              bg={false ? 'gray.300' : 'coolGray.100'}
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              }}
              rounded="4"
              shadow={3}
              borderWidth="1"
              borderColor="coolGray.300">
              <Box flex={1}>
                <Text color="coolGray.800" fontWeight="medium" fontSize="16">
                  {title}
                </Text>
                <Text fontSize="14" color="coolGray.700">
                  Cập nhật gần đây: {time.toLocaleDateString('en-GB')}
                </Text>
              </Box>
            </Box>
          );
        }}
      </Pressable>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <ScrollView w="100%">
            <Text>{content}</Text>
            <Link href={link} _text={{color: 'cyan.500'}}>
              Mở link
            </Link>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default DocumentItem;
