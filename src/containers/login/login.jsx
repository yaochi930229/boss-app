// 登录组件路由
import React, { Component } from 'react';
import Logo from '../../components/logo/logo';
import {
  NavBar,
  Button,
  WingBlank,
  WhiteSpace,
  List,
  InputItem,
} from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../redux/actions';
class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  handlerChange = (name, val) => {
    this.setState({
      [name]: val,
    })
  }

  loginFn = () => {
    this.props.login(this.state)
  }

  toRegister = () => {
    this.props.history.replace('/register')
  }

  render() {
    const { msg, redirectTo } = this.props.user
    if (redirectTo) return <Redirect to={redirectTo} />
    return (
      <div className="login-page">
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {msg ? <div className="error-msg">{msg}</div>:null}
            <WhiteSpace size="xs" />
              <InputItem onChange={val => this.handlerChange('username', val)} placeholder="请输入用户名">用户名：</InputItem>
              <InputItem onChange={val => this.handlerChange('password', val)} type="password" placeholder="请输入密码">密&nbsp;&nbsp;&nbsp;码：</InputItem>
            <Button type="primary" onClick={this.loginFn}>登&nbsp;&nbsp;&nbsp;录</Button>
            <Button onClick={this.toRegister}>还没有账户</Button>
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
  {login}
)(Login)