import axios from 'axios';
const BASE_URL = 'https://5gdatavip.xyz';
// const BASE_URL = 'https://demo.v2board.com';
// const BASE_URL = 'https://4gviet.com';
export const login = '/api/v1/passport/auth/login';
export const register = '/api/v1/passport/auth/register';
export const changePassword = '/api/v1/user/changePassword';
export const getSubscribe = '/api/v1/user/getSubscribe';
export const info = '/api/v1/user/info';
export const notice = '/api/v1/user/notice/fetch';
export const knowledge = '/api/v1/user/knowledge/fetch';
export const plan = '/api/v1/user/plan/fetch';
export const saveOrder = '/api/v1/user/order/save';
export const orderDetail = '/api/v1/user/order/detail?trade_no=';
export const orderCancel = '/api/v1/user/order/cancel';
export const fetchOrder = '/api/v1/user/order/fetch';
export const fetchServer = '/api/v1/user/server/fetch';
export const fetchInvite = '/api/v1/user/invite/fetch';
export const fetchConfig = '/api/v1/user/comm/config';
export const createInvite = '/api/v1/user/invite/save';
export const resetSecurity = '/api/v1/user/resetSecurity';
export const phone = '0967153690';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Language': 'vi-VN',
  },
});
