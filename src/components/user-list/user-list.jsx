import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { WingBlank, WhiteSpace, Card } from 'antd-mobile';
const Header = Card.Header;
const Body = Card.Body;

class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  
  render() {
    const {userList} = this.props
    return (
      <WingBlank>
        {
          userList.map(user => (
            <div>
              <WhiteSpace />
              <Card>
                <Header thumb={require(`../../assets/images/header_${user.header}.jpg`)}
                        extra={user.username}
                        thumbStyle={{width:50}}></Header>
                <Body>
                  <div>职位: {user.post}</div>
                  {user.company ? <div>公司: {user.company}</div> : null}
                  {user.salary ? <div>月薪: {user.salary}</div> : null}
                  <div>描述: {user.info}</div>
                </Body>
              </Card>
            </div>
          ))
        }
      </WingBlank>
    )
  }
}

export default withRouter(UserList)