import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
const Item = TabBar.Item;

// 希望在非路由组件中使用路由库的api
// 使用withRoute就可以使用

class NavFooter extends Component {
  static propTypes = {
    navList: PropTypes.array.isRequired
  }
  render() {
    let { navList } = this.props;
    navList = navList.filter(nav => !nav.hide);
    const path = this.props.location.pathname;
    return (
      <div className="nav-footer">
        <TabBar>
          {
            navList.map(nav => (
              <Item key={nav.path}
                    title={nav.text}
                    icon={{uri: require(`./images/${nav.icon}.png`)}}
                    selectedIcon={{uri:require(`./images/${nav.icon}_selected.png`)}}
                    selected={path===nav.path}
                    onPress={() => {
                      if (path === nav.path) return
                      this.props.history.replace(nav.path)
                    }}></Item>
            ))
          }
        </TabBar>
      </div>
    )
  }
}

export default withRouter(NavFooter) // 向外暴露withRouter()包装产生的组件