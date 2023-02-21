import {Configs, Config} from '../../types';
import {createAction} from '@reduxjs/toolkit';
import {withPayloadType} from '../../ultils/getTypes';

/* Creating an action. */
export const getAllConfigsAPIAction = createAction(
  '[configs] get all configs api',
);
export const importConfigsClipboardAction = createAction(
  '[configs] get all configs clipboard',
);
export const getAllConfigsLocalAction = createAction(
  '[configs] get all configs local',
);
export const deleteAllConfigsAction = createAction(
  '[configs] delete all configs',
);
export const deleteOneConfigAction = createAction(
  '[configs] delete one config',
  withPayloadType<Config>(),
);
export const selectOneConfigAction = createAction(
  '[configs] select one config',
  withPayloadType<Config>(),
);
export const getAllConfigsActionSuccess = createAction(
  '[configs] get all configs success',
  withPayloadType<Configs>(),
);
export const getAllConfigsActionError = createAction(
  '[configs] get all configs error',
);

export const testApiAction = createAction('[configs] test api');
