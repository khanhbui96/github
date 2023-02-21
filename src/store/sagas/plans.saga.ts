import {getAllConfigsActionError} from '../actions/configs.action';
import {takeLatest, call, put} from 'redux-saga/effects';
import {CallReturnType} from '../../ultils/getTypes';
import {
  getAllPlanAPIAction,
  getAllPlanAPISuccessAction,
  getAllPlanAPIErrorAction,
} from '../actions/plan.action';
import {getPlanApi} from '../../api/planApi';

export function* getAllPlanApiSaga() {
  //   yield delay(1000);
  try {
    const plans: CallReturnType<typeof getPlanApi> = yield call(getPlanApi);
    yield put(getAllPlanAPISuccessAction(plans));
  } catch (error: any) {
    console.log(error);
    yield put(getAllPlanAPIErrorAction());
  }
}

export function* watchPlanSaga() {
  yield takeLatest(getAllPlanAPIAction, getAllPlanApiSaga);
}
