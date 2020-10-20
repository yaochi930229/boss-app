import { 
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
} from './actions-types';
import {
  reqRegister,
  reqLogin,
  reqUpdateUserInfo,
  reqUserInfo,
  reqUserList,
} from '../api';

// 授权成功的同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// 错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
// 接收用户的同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
// 重置用户的同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
// 获取用户列表的同步action
export const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})

// 注册异步action
export const register = (user) => {
  const {username, password, password2, type} = user;
  if (!username) return errorMsg('用户名必须指定！')
  if (!password) return errorMsg('密码必须指定！')
  if (password !== password2) return errorMsg('2次密码不一致！')
  return async dispatch => {
    // 发送注册的异步请求
    const response = await reqRegister({username, password, type})
    const result = response.data
    if (result.code === 0) { // 成功
      // 分发成功的action
      dispatch(authSuccess(result.data))
    } else { // 失败
      // 分发失败的action
      dispatch(errorMsg(result.msg))
    }
  }
}

// 登录异步action
export const login = (user) => {
  const {username, password} = user;
  if (!username) return errorMsg('用户名必须指定！')
  if (!password) return errorMsg('密码必须指定！')
  return async dispatch => {
    // 发送登录的异步请求
    const response = await reqLogin(user)
    const result = response.data
    if (result.code === 0) { // 成功
      dispatch(authSuccess(result.data))
    } else { // 失败
      dispatch(errorMsg(result.msg))
    }
  }
}

// 更新用户信息
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUserInfo(user)
    const result = response.data
    if (result.code === 0) { // 成功
      dispatch(receiveUser(result.data))
    } else { // 失败
      dispatch(resetUser(result.msg))
    }
  }
}

// 获取用户信息
export const getUserInfo = (userid) => {
  return async dispatch => {
    const response = await reqUserInfo(userid)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

// 获取用户列表
export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if (result.code === 0) {
      dispatch(receiveUserList(result.data))
    }
  }
}