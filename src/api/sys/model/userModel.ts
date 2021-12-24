/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  role: string;
  title: string;
  id: number;
}

export interface LoginMobileParams {
  mobile: string;
  sms: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId?: string | number;
  token: string;
  role?: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName?: string;
  // 用户昵称
  nickname?: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface LoginSendCodeModel {
  mobile: string;
}

export interface LoginMobileModel extends LoginSendCodeModel {
  sms: string;
}

export interface RegisterModel extends LoginMobileModel, LoginParams {
  confirmPassword: string;
}
