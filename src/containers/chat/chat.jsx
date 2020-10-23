import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMsg } from '../../redux/actions';
import { NavBar, List, InputItem } from 'antd-mobile';
import './chat.less';
const Item = List.Item;

class Chat extends Component {
  state = {
    content: '',
  }

  handleSend = () => {
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const content = this.state.content.trim();
    // 发送消息
    if (content) {
      this.props.sendMsg({from, to, content})
      // 清除输入数据
      this.setState({content: ''})
    }
  }
  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat
    // 当前聊天的id
    const meId = user._id
    if (!users[meId]) return null
    const targetId = this.props.match.params.userid
    const chatId = [meId, targetId].sort().join('_')
    // 对chatMsgs进行过滤
    const msgs = chatMsgs ? chatMsgs.filter(msg => msg.chat_id === chatId) : []
    // 聊天对象的头像
    const targetHeadr = users[targetId].header
    const targetAvatar = targetHeadr ? require(`../../assets/images/header_${targetHeadr}.jpg`) :null
    return (
      <div>
        <NavBar className='sticky-header'>正在与{users[targetId].username}聊天</NavBar>
        <List>
          {
            msgs.map(msg => {
              if (targetId === msg.from) { // 对方发给我
                return (
                  <Item key={msg._id} thumb={targetAvatar}>
                    {msg.content}
                  </Item>
                )
              } else {
                return (
                  <Item key={msg._id} extra='我' className='mine-row'>
                    {msg.content}
                  </Item>
                )
              }
            })
          }
        </List>
        <div className='nav-footer'>
          <InputItem
            value={this.state.content}
            onChange={val => this.setState({content: val})}
            placeholder='请输入'
            extra={
              <div>
                <span role='img'>❤️</span>
                <span onClick={this.handleSend}>发送</span>
              </div>
            }></InputItem>
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg}
)(Chat)