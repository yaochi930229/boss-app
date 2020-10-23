// 包含 n 个 reducer函数：根据老的 state 和指定的 action返回一个新的 state
import { combineReducers } from 'redux';
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
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


const initChat = {
  users: {}, // 所有用户信息的对象
  chatMsgs: [], // 当前用户所有相关的msg的数组
  unReadCount: 0, // 总的未读数量
}
// 产生聊天状态的reducer
function chat(state=initChat, action) {
  console.log(action.type, 'action=======')
  console.log(state, 'state=======')
  switch (action.type) {
    case RECEIVE_MSG_LIST:  // data: {users, chatMsgs}
      const {users, chatMsgs} = action.data
      return {
        users,
        chatMsgs,
        unReadCount: 0,
      }
    case RECEIVE_MSG:
      const chatMsg = action.data
      const _chatMsgs = state.chatMsgs ? state.chatMsgs : []
      return {
        users: state.users,
        chatMsgs: [..._chatMsgs, chatMsg],
        unReadCount: 0,
      }
    default:
      return state
  }
}

export default combineReducers({
  user,
  userList,
  chat,
})

// 向外暴露的状态结构 { name: 1, labelName: 2 }
