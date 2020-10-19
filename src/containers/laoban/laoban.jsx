import React, {Component} from 'react';
import { connect } from 'react-redux';
class Laoban extends Component {
  render() {
    return (
      <div>老板</div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {},
)(Laoban)