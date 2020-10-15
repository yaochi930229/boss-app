// 注册组件路由
import React, { Component } from 'react';
import Logo from '../../components/logo/logo';
import {
  NavBar,
  Button,
  WingBlank,
  WhiteSpace,
  List,
  InputItem,
  Radio,
} from 'antd-mobile';
const ListItem = List.Item;
export default class Register extends Component {
  render() {
    return (
      <div>
        <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            <WhiteSpace size="xs" />
              <InputItem placeholder="请输入用户名">用户名：</InputItem>
              <InputItem type="password" placeholder="请输入密码">密码：</InputItem>
              <InputItem type="password" placeholder="请确认密码">确认密码：</InputItem>
            <ListItem>
              <span>用户类型：</span>
              &nbsp;&nbsp;&nbsp;
              <Radio>大神</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio>老板</Radio>
            </ListItem>
            <Button type="primary">注&nbsp;&nbsp;&nbsp;册</Button>
            <Button>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}