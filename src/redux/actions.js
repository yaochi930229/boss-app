import io from 'socket.io-client';
import { 
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
} from './actions-types';
import {
  reqRegister,
  reqLogin,
  reqUpdateUserInfo,
  reqUserInfo,
  reqUserList,
  reqChatMsgList,
  // reqReadMsg,
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
// 接收消息列表的同步action
export const receiveMsgList = ({users, chatMsgs}) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs}})
// 接收一个消息的同步action
export const receiveMsg = (chatMsg) => ({type: RECEIVE_MSG, data: chatMsg})



/**
 * 单例对象：单一的实例
 * 1.创建对象之前：判断对象是否已经存在，只有当不存在是去创建
 * 2.创建对象之后：保存对象
 */

function initIO(dispatch, userid) {
  // 连接服务器，得到代表连接的socket对象
  if (!io.socket) {
    io.socket = io('ws://localhost:4000');
    // 绑定'receiveMessage'的监听,来接收服务器发送的消息
    io.socket.on('receiveMsg', function (chatMsg) {
      console.log('浏览器端接收服务端的消息=============', chatMsg);
      console.log('userid=======', userid);
      // 只有当chatMsg是与当前用户相关的信息，才去分发同步action报存消息
      if (userid === chatMsg.from || userid === chatMsg.to) {
        console.log(112)
        dispatch(receiveMsg(chatMsg))
      }
    })
  }
}



// 异步获取消息列表数据
async function getMsgList(dispatch, userid) {
  initIO(dispatch, userid)
  const response = await reqChatMsgList()
  const result = response.data
  if (result.code === 0) {
    const { users, chatMsgs } = result.data
    // 分发同步action
    dispatch(receiveMsgList({users, chatMsgs}))
  }
}

// 发送消息
export const sendMsg = ({from, to, content}) => {
  return dispatch => {
    // 发送消息
    io.socket.emit('sendMsg', {from, to, content})
  }
}


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
      getMsgList(dispatch, result.data._id)
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
      getMsgList(dispatch, result.data._id)
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
export const getUserInfo = () => {
  return async dispatch => {
    const response = await reqUserInfo()
    const result = response.data
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id)
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