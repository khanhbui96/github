import {createAction} from '@reduxjs/toolkit';
import {Plans} from '../../types';
import {withPayloadType} from '../../ultils/getTypes';

export const getAllPlanAPIAction = createAction('[plan] get all plans api');
export const getAllPlanAPISuccessAction = createAction(
  '[plan] get all plans api success',
  withPayloadType<Plans>(),
);
export const filterPlansAction = createAction(
  '[plan] filter plans',
  withPayloadType<Plans>(),
);
export const getAllPlanAPIErrorAction = createAction(
  '[plan] get all plans api error',
);
