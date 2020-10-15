// 包含 n 个 reducer函数：根据老的 state 和指定的 action返回一个新的 state
import { combineReducers } from 'redux'

function name(state=1, action) {
  return state
}


function labelName(state=2, action) {
  return state
}


export default combineReducers({
  name,
  labelName,
})

// 向外暴露的状态结构 { name: 1, labelName: 2 }