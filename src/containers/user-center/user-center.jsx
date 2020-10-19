import React, {Component} from 'react';
import { connect } from 'react-redux';
class UserCenter extends Component {
  render() {
    const { header } = this.props.user
    return (
      <div>
        <img src={require(`../../assets/images/header_${header}.jpg`)} alt="头像" />
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {},
)(UserCenter)