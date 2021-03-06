import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  LoginSendCodeModel,
  LoginMobileModel,
  RegisterModel,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  SendLoginCode = '/login/sendCode',
  LoginMobile = '/login/mobile',
  SendRegisterCode = '/register/sendCode',
  Register = '/register',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function sendLoginCode(params: LoginSendCodeModel) {
  return defHttp.post({ url: Api.SendLoginCode, params });
}

export function sendRegisterCode(params: LoginSendCodeModel) {
  return defHttp.post({ url: Api.SendRegisterCode, params });
}

export function register(params: RegisterModel) {
  return defHttp.post({ url: Api.Register, params });
}

export function loginMobile(params: LoginMobileModel, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.LoginMobile,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
