import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import './not-fund.less';
export default class NotFund extends Component {
  render() {
    return (
      <div className="not-fund-page">
        <h2>抱歉，找不到该页面！</h2>
        <Button className="back-button" type="primary" onClick={() => this.props.history.replace("/")}>
          回到首页
        </Button>
      </div>
    )
  }
}