import React, {useState, useEffect} from 'react';
import {Box, ScrollView, Text} from 'native-base';
import DocumentCard from '../components/DocumentCard';
import {getKnowledgeApi} from '../api/serverApi';
const getKnowledge = async () => {
  return await getKnowledgeApi();
};
const DocumentScreen = () => {
  const [knowledges, setKnowledges] = useState([]);
  useEffect(() => {
    getKnowledge()
      .then(data => {
        const newData: any = Object.entries(data);
        setKnowledges(newData);
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <Box flex={1} bg="gray.200">
      <ScrollView>
        {knowledges.length !== 0 &&
          knowledges.map((item: any, index: any) => (
            <DocumentCard key={index} knowledge={item} />
          ))}
      </ScrollView>
    </Box>
  );
};

export default DocumentScreen;
