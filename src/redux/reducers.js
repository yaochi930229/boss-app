// 包含 n 个 reducer函数：根据老的 state 和指定的 action返回一个新的 state
import { combineReducers } from 'redux';
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_USER_LIST,
} from './actions-types';
import { getRedirectTo } from '../utils';

const initUser = {
  username: '', // 用户名
  type: '', // 用户类型 dashen/laoban
  msg: '', // 错误提示信息
  redirectTo: '',
};
// 产生user状态的reducer
function user(state=initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
    const {type, header} = action.data
      return {...action.data, redirectTo: getRedirectTo(type, header)}
    case ERROR_MSG:
      return {...state, msg: action.data}
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {...initUser, msg: action.data}
    default:
      return state
  }
}

const initUserList = []

// 产生userList状态的reducer
function userList(state=initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}

export default combineReducers({
  user,
  userList,
})

// 向外暴露的状态结构 { name: 1, labelName: 2 }
