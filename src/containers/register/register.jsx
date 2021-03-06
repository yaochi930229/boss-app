// 注册组件路由
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './register.less';
import {
  NavBar,
  Button,
  WingBlank,
  WhiteSpace,
  List,
  InputItem,
  Radio,
} from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/actions';
import Logo from '../../components/logo/logo';

const ListItem = List.Item;
class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    type: 'laoban', // 老板：laoban 大神：dashen
  }

  handlerChange = (name, val) => {
    this.setState({
      [name]: val,
    })
  }

  registerFn = () => {
    console.log(this.state, '获取填写的值')
    this.props.register(this.state)
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  render() {
    const { type } = this.state
    const { msg, redirectTo } = this.props.user
    if (redirectTo) return <Redirect to={redirectTo} />

    return (
      <div className="register-page">
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {msg ?<div className="error-msg">{msg}</div> : null}
            <WhiteSpace size="xs" />
              <InputItem onChange={val => this.handlerChange('username', val)} placeholder="请输入用户名">用户名：</InputItem>
              <InputItem onChange={val => this.handlerChange('password', val)} type="password" placeholder="请输入密码">密&nbsp;&nbsp;&nbsp;码：</InputItem>
              <InputItem onChange={val => this.handlerChange('password2', val)} type="password" placeholder="请确认密码">确认密码：</InputItem>
            <ListItem>
              <span>用户类型：</span>
              &nbsp;&nbsp;&nbsp;
              {/* <Radio checked={type==='dashen'} name="dashen" onChange={val => this.handlerChange('type', val.target.name)}>大神</Radio> */}
              <Radio checked={type==='dashen'} onChange={() => this.handlerChange('type', 'dashen')}>大神</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='laoban'} name="laoban" onChange={val => this.handlerChange('type', val.target.name)}>老板</Radio>
            </ListItem>
            <Button type="primary" onClick={this.registerFn}>注&nbsp;&nbsp;&nbsp;册</Button>
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  {register}
)(Register)