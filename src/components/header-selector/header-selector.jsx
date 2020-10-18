// 选择用户头像的组件
import React, {Component} from 'react';
import { List, Grid } from 'antd-mobile';
import PropTypes from 'prop-types';
import './index.less';

export default class HeaderSelector extends Component {
  static propTypes = {
    setHeader: PropTypes.func.isRequired,
  }
  state = {
    icon: null,
  }
  constructor(props) {
    super(props)
    this.headerList = []
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: `头像${i+1}`,
        icon: require(`../../assets/images/header_${i+1}.jpg`),
      })
    }
  }

  handleClick = (val) => {
    console.log(val, 'jsa')
    this.setState({
      icon: val.icon,
    })
    this.props.setHeader(val.text)
  }

  render() {
    const {icon} = this.state
    const headerTitle = icon ?
      (<div className='avatar-box'>已选择头像<img src={icon} alt='header' /></div>) 
      : '请选择头像';
    return (
      <List renderHeader={() => headerTitle}>
        <Grid data={this.headerList}
              columnNum={5}
              onClick={this.handleClick}></Grid>
      </List>
    )
  }
}