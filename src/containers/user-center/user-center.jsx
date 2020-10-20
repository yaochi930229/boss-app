import React, {Component} from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Result, WhiteSpace, List, Button, Modal } from 'antd-mobile';
import { resetUser } from '../../redux/actions';
const Item = List.Item;
const Brief = Item.Brief;
class UserCenter extends Component {
  typeObj = {
    dashen: '大神',
    laoban: '老板',
  }
  loginOut = () => {
    Modal.alert('退出', '确定退出登录吗?', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          // 清除cookie中的userid
          Cookies.remove('userid');
          // 清除redux管理的user
          this.props.resetUser();
        }
      }
    ])
  }
  render() {
    const { header, username, company, type, post, salary, info } = this.props.user
    return (
      <div className="user-center-page">
        <Result
          img={<img src={require(`../../assets/images/header_${header}.jpg`)} alt={header} style={{width:50}} />}
          title={username}
          message={this.typeObj[type]}></Result>
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位：{post}</Brief>
            <Brief>简介：{info}</Brief>
            {company ? <Brief>公司：{company}</Brief> : null}
            {salary ? <Brief>薪资：{salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <Button type="warning" onClick={this.loginOut}>退出登录</Button>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser},
)(UserCenter)