import {call, put, takeLatest} from 'redux-saga/effects';
import {CallReturnType} from './../../../ultils/getTypes';
import {
  getAllConfigsAPI,
  getAllConfigsLocal,
  importConfigsClipboard,
  deleteAllConfigs,
  deleteOneConfig,
  selectOneConfig,
  testApi,
} from '../../../api/configsApi';
import {
  getAllConfigsActionError,
  getAllConfigsActionSuccess,
  getAllConfigsAPIAction,
  getAllConfigsLocalAction,
  importConfigsClipboardAction,
  deleteAllConfigsAction,
  deleteOneConfigAction,
  selectOneConfigAction,
  testApiAction,
} from './../../actions/configs.action';
import {PayloadAction} from '@reduxjs/toolkit';
import {Config} from '../../../types';

/* A generator function. */
function* getAllConfigsByUserAPISaga() {
  try {
    const configs: CallReturnType<typeof getAllConfigsAPI> = yield call(
      getAllConfigsAPI,
    );
    yield configs && put(getAllConfigsActionSuccess(configs));
  } catch (error: any) {
    console.log(error);
    yield put(getAllConfigsActionError(error.message));
  }
}
function* getAllConfigsByUserLocalSaga() {
  try {
    const configs: CallReturnType<typeof getAllConfigsLocal> = yield call(
      getAllConfigsLocal,
    );
    yield configs && put(getAllConfigsActionSuccess(configs));
  } catch (error: any) {
    yield put(getAllConfigsActionError(error.message));
  }
}
function* importConfigsFromClipboardSaga() {
  try {
    const configs: CallReturnType<typeof importConfigsClipboard> = yield call(
      importConfigsClipboard,
    );
    yield configs && put(getAllConfigsActionSuccess(configs));
  } catch (error: any) {
    yield put(getAllConfigsActionError(error.message));
  }
}
function* deleteAllConfigsSaga() {
  try {
    const configs: CallReturnType<typeof deleteAllConfigs> = yield call(
      deleteAllConfigs,
    );
    yield configs && put(getAllConfigsActionSuccess(configs));
  } catch (error: any) {
    yield put(getAllConfigsActionError(error.message));
  }
}
function* deleteOneConfigSaga(action: PayloadAction<Config>) {
  try {
    const configs: CallReturnType<typeof deleteOneConfig> | undefined =
      yield call(deleteOneConfig, action.payload);
    yield configs && put(getAllConfigsActionSuccess(configs));
  } catch (error: any) {
    yield put(getAllConfigsActionError(error.message));
  }
}
function* selectOneConfigSaga(action: PayloadAction<Config>) {
  try {
    const configs: CallReturnType<typeof selectOneConfig> | undefined =
      yield call(selectOneConfig, action.payload);
    yield configs && put(getAllConfigsActionSuccess(configs));
  } catch (error: any) {
    yield put(getAllConfigsActionError(error.message));
  }
}
// function* testApiSaga(action: PayloadAction<Config>) {
//   try {
//     const configs: CallReturnType<typeof testApi> | undefined = yield call(
//       testApi,
//     );
//   } catch (error: any) {
//     console.log(error);
//   }
// }
/* A generator function. It is used to watch the action `getAllConfigsByUser` and call the generator
function `getAllConfigsByUserSaga` when the action is dispatched. */
export function* watchGetAllConfigs() {
  yield takeLatest(getAllConfigsAPIAction, getAllConfigsByUserAPISaga);
  yield takeLatest(getAllConfigsLocalAction, getAllConfigsByUserLocalSaga);
  yield takeLatest(
    importConfigsClipboardAction,
    importConfigsFromClipboardSaga,
  );
  yield takeLatest(deleteAllConfigsAction, deleteAllConfigsSaga);
  yield takeLatest(deleteOneConfigAction, deleteOneConfigSaga);
  yield takeLatest(selectOneConfigAction, selectOneConfigSaga);
  // yield takeLatest(testApiAction, testApiSaga);
}
