// 大神信息完善的路由容器组件
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button,
} from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import HeaderSelector from '../../components/header-selector/header-selector';
import { updateUser } from '../../redux/actions';

class DashenInfo extends Component {
  state = {
    header: '',
    post: '',
    info: '',
  }
  handlerChange = (name, val) => {
    this.setState({
      [name]: val,
    })
  }

  save = () => {
    this.props.updateUser(this.state)
  }
  setHeader = (header) => {
    this.setState({
      header,
    })
  }
  render() {
    const {header, type} = this.props.user
    if (header) {
      const path = `/${type}`
      return <Redirect to={path} />
    }
    return (
      <div>
        <NavBar>大神信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader} />
        <InputItem placeholder='请输入求职岗位' onChange={(val => this.handlerChange('post', val))}>求职岗位:</InputItem>
        <TextareaItem
          placeholder='请输入个人简介'
          title='个人简介:'
          rows={3}
          onChange={(val => this.handlerChange('info', val))}>
        </TextareaItem>
        <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(DashenInfo)
