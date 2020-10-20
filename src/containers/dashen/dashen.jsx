import React, {Component} from 'react';
import { connect } from 'react-redux';
import UserList from '../../components/user-list/user-list';
import { getUserList } from '../../redux/actions';
class Dashen extends Component {
  componentDidMount () {
    this.props.getUserList('laoban');
  }
  render() {
    const {userList} = this.props
    return (
      <div>
        <UserList userList={userList}></UserList>
      </div>
    )
  }
}

export default connect(
  state => ({
    userList: state.userList,
  }),
  {getUserList},
)(Dashen)