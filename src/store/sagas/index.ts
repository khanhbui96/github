import {all, fork} from 'redux-saga/effects';
import {watchPlanSaga} from './plans.saga';
import configsSaga from './configs';

function* rootSaga() {
  yield all([fork(configsSaga)]);
  yield all([fork(watchPlanSaga)]);
}
export default rootSaga;
