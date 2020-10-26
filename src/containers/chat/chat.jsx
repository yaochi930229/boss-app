import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMsg } from '../../redux/actions';
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile';
import './chat.less';
const Item = List.Item;

class Chat extends Component {
  state = {
    content: '',
    isShow: false,
    emojis: [],
  }

  // 在第一次render()之前回调
  componentWillMount () {
    // 初始化表情列表数据
    const emojisArr = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂','🙂',
    '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
    '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨',
    '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤',
    '😴', '😷', '🤒', '🤕', '🤢'];
    const emojis = emojisArr.map(item => ({text: item}))
    this.setState({emojis})
  }

  componentDidMount () {
    // 初始化显示聊天界面滑动到底部
    const sH = document.documentElement.scrollHeight + document.body.scrollHeight;
    window.scrollTo(0, sH)
  }

  componentDidUpdate () {
    // 更新显示列表
    const sH = document.documentElement.scrollHeight + document.body.scrollHeight;
    window.scrollTo(0, sH)
  }

  handleSend = () => {
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const content = this.state.content.trim();
    // 发送消息
    if (content) {
      this.props.sendMsg({from, to, content})
      // 清除输入数据
      this.setState({content: '', isShow: false})
    }
  }

  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({isShow})
    if (isShow) {
      // 异步手动派发resize事件，解决表情列表显示的Bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
        const sH = document.documentElement.scrollHeight + document.body.scrollHeight;
        window.scrollTo(0, sH)
      }, 0)
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
        <NavBar
          onLeftClick={() => this.props.history.goBack()}
          icon={<Icon type='left' />}
          className='sticky-header'>
            正在与{users[targetId].username}聊天
        </NavBar>
        <List className={this.state.isShow ? '' : 'list-row'}>
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
        <div className={this.state.isShow ? '':'nav-footer'}>
          <InputItem
            value={this.state.content}
            onChange={val => this.setState({content: val})}
            placeholder='请输入'
            extra={
              <div>
                <span role="img" aria-labelledby="panda1" onClick={this.toggleShow} style={{marginRight: 5}}>🐼</span>
                <span onClick={this.handleSend}>发送</span>
              </div>
            }></InputItem>
          {this.state.isShow ? (
            <Grid
            data={this.state.emojis}
            columnNum={8}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={(item) => {
              this.setState({content: this.state.content + item.text})
            }} />
          ) : null}
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg}
)(Chat)