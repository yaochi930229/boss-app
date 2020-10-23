// 主体组件路由
import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';
import {
  NavBar,
} from 'antd-mobile';
import './main.less';

import LaobanInfo from '../laoban-info/laoban-info';
import DashenInfo from '../dashen-info/dashen-info';
import Message from '../message/message';
import Dashen from '../dashen/dashen';
import Laoban from '../laoban/laoban';
import UserCenter from '../user-center/user-center';
import NotFund from '../../components/not-fund/not-fund';
import NavFooter from '../../components/nav-footer/nav-footer';
import Chat from '../chat/chat';



import { getRedirectTo } from '../../utils';
import { getUserInfo } from '../../redux/actions';
class Main extends Component {
  navList = [
    {
      path: '/laoban',
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen',
      component: Dashen,
      title: '老板列表',
      icon: 'dashen',
      text: '老板',
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/usercenter',
      component: UserCenter,
      title: '个人中心',
      icon: 'user',
      text: '我的',
    },
  ]
  componentDidMount () {
    // 登录过(cookie中有userid),但没有登录(redux管理的user中没有_id),发送请求获取对应的user
    const userid = Cookies.get('userid');
    const { _id } = this.props.user;
    if (userid && !_id) {
      // 发送异步请求,获取user
      console.log('发送请求，获取user')
      this.props.getUserInfo()
    }
  }
  render() {
    // 检查用户是否登录， 如果没有自动从定向到登录界面
    const {user} = this.props
    // if (!user._id) return <Redirect to='/login' />
    const userid = Cookies.get('userid');
    if (!userid) return <Redirect to='/login' />
    if (!user._id) {
      return null
    } else {
      let path = this.props.location.pathname;
      if (path === '/') {
        path = getRedirectTo(user.type, user.header)
        return <Redirect to={path} />
      }
    }
    const { navList } = this;
    const path = this.props.location.pathname;
    const currentNav = navList.find(nav => nav.path === path);
    if (currentNav) {
      if (user.type === 'laoban') {
        navList[1].hide = true
      } else {
        navList[0].hide = true
      }
    }
    return (
      <div className="main-body-content">
        {currentNav ? <NavBar className="sticky-header">{currentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map((nav, index) => <Route path={nav.path} component={nav.component} key={index} />)
          }
          <Route path='/laobaninfo' component={LaobanInfo} />
          <Route path='/dasheninfo' component={DashenInfo} />
          <Route path='/chat/:userid' component={Chat} />
          <Route component={NotFund} />
        </Switch>
        {currentNav ? <NavFooter navList={navList} /> : null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUserInfo}
)(Main)