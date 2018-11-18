import React from "react";
import UserInfoDocu from "./UserInfoDocu.jsx";
import UserInfoMessage from "./UserInfoMessage.jsx";
import UserChangePass from "./UserChangePass.jsx";


const home = (callback) => {
  require.ensure([], require => {
    callback(null, require('./UserChangePass.jsx'))
  }, 'UserChangePass')  
}
const userInfo = (callback) => {
  require.ensure([], require => {
    callback(null, require("./UserInfoDocu.jsx"))
  }, 'UserInfoDocu')  
}

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    let commonClass = "flex-sm-fill nav-link dv-mt10";
    console.log(home)
    this.state = {
      navs: [
        {
          class: commonClass,
          name: "docMessage",
          href: "#docContent",
          title: "历史文档信息",
          content: <UserInfoDocu userId={this.props.userId}/>
        }, {
          class: commonClass,
          name: "userMessage",
          href: "#userContent",
          title: "个人信息维护",
          content: <UserInfoMessage userId={this.props.userId}/>
        }, {
          class: commonClass,
          name: "changePass",
          href: "#passContent",
          title: "修改密码",
          content: <UserChangePass userId={this.props.userId} loginName={this.props.loginName}/>
        }, {
          class: commonClass,
          name: "exit",
          href: "#exitContent",
          title: "退出登录"
        }
      ],
      currentContent: {}
    }
  }
  componentDidMount() {
    this.setState({currentContent: this.state.navs[0]});
  }

  getNav() {
    let me = this;
    let navs = this.state.navs;
    return (
      <nav className="col-2 nav flex-column ustify-content-end dv-nav">
        {navs
          .map(function (item, index) {
            return (
              <a
                key={index}
                className={item.class}
                data-toggle="tab"
                href="#doc"
                role="tab"
                onClick={me
                .getContentAction
                .bind(this, item, me)}>
                <h5>{item.title}</h5>
              </a>
            );
          })}
      </nav>
    )
  }

  getContent() {
    let returnContenr = (
      <h4 className="card-title">抱歉，功能尚未开发完成！</h4>
    );
    let item = this.state.currentContent;
    if (item.hasOwnProperty('content')) {
      returnContenr = item.content;
    }
    return returnContenr;
  }

  getContentAction(item, mine, event) {
    mine.setState({currentContent: item});
  }

  render() {
    return (
      <div className="row">
        {this.getNav()}
        <div className="col-10">
          <div className="card dv-nav-contents">
            <div className="card-header">
              <strong>{this.state.currentContent.title}</strong>
            </div>
            <div className="card-block">
              {this.getContent()}
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default UserInfo;