import {StyleSheet, Text, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Radio, Stack, Center, Box, ScrollView, FlatList} from 'native-base';
import PlanCard from '../components/PlanCard';
import {useDispatch, useSelector} from 'react-redux';
import {getAllPlanAPIAction} from '../store/actions/plan.action';
import {selectPlansState} from '../store/selectors/plans.selector';

const PlanScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {plans} = useSelector(selectPlansState);
  const [value, setValue] = useState('1');
  const filterPlans = () => {
    plans.map((plan: any) => {
      delete plan.content;
    });
    if (value === '1') {
      return plans;
    }
    if (value === '2') {
      return plans.filter((plan: any) => {
        return plan.month_price;
      });
    }
    if (value === '3') {
      return plans.filter((plan: any) => {
        return plan.onetime_price;
      });
    }
  };

  useEffect(() => {
    dispatch(getAllPlanAPIAction());
  }, [isFocused]);
  return (
    <Box>
      <Center mt="2">
        <Radio.Group
          onChange={nextValue => setValue(nextValue)}
          name="exampleGroup"
          defaultValue="1"
          accessibilityLabel="pick a size">
          <Stack direction="row" space={4}>
            <Radio value="1" colorScheme="red" size="md" my={1}>
              Tất cả
            </Radio>
            <Radio value="2" colorScheme="green" size="md" my={1}>
              Chu kỳ
            </Radio>
            <Radio value="3" colorScheme="yellow" size="md" my={1}>
              Không thời hạn
            </Radio>
          </Stack>
        </Radio.Group>
      </Center>
      <FlatList
        mb="30"
        data={filterPlans()}
        renderItem={({item, index}) => <PlanCard key={index} plan={item} />}
      />
    </Box>
  );
};

export default PlanScreen;

const styles = StyleSheet.create({});
