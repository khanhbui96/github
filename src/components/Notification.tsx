import {Text, Dimensions, StyleSheet, View} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import React, {useState, useEffect} from 'react';
import NotificationCard from './NotificationCard';
interface NotificationProps {
  notices: any;
}
const Notification = (props: NotificationProps) => {
  const {notices} = props;
  const [data, setData] = useState([]);
  useEffect(() => {
    if (notices) {
      setData(notices);
    }
  }, [notices]);
  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplayDelay={3}
        autoplayLoop
        paginationDefaultColor="white"
        paginationActiveColor="gray"
        showPagination>
        {data.length &&
          data.map((item, index) => {
            return (
              <View style={[styles.child]} key={index}>
                <NotificationCard notice={item} />
              </View>
            );
          })}
      </SwiperFlatList>
    </View>
  );
};

export default Notification;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {flex: 1, marginVertical: 10},
  child: {width, justifyContent: 'center'},
  text: {fontSize: width * 0.5, textAlign: 'center'},
});
