// 老板信息完善的路由容器组件
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

class LaobanInfo extends Component {
  state = {
    header: '',
    post: '',
    info: '',
    company: '',
    salary: '',
  }

  handlerChange = (name, val) => {
    this.setState({
      [name]: val,
    })
  }

  save = () => {
    console.log(this.state)
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
        <NavBar>老板信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader} />
        <InputItem placeholder='请输入招聘职位' onChange={(val => this.handlerChange('post', val))}>招聘职位:</InputItem>
        <InputItem placeholder='请输入公司名称' onChange={(val => this.handlerChange('company', val))}>公司名称:</InputItem>
        <InputItem placeholder='请输入职位薪资' onChange={(val => this.handlerChange('salary', val))}>职位薪资:</InputItem>
        <TextareaItem
          placeholder='请输入职位要求'
          title='职位要求:'
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
)(LaobanInfo)
