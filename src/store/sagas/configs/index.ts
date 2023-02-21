import {all, fork} from 'redux-saga/effects';
import {watchGetAllConfigs} from './configs.saga';

function* configsSaga() {
  yield all([fork(watchGetAllConfigs)]);
}
export default configsSaga;
