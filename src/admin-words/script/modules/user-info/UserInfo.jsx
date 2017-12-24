import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import UserInfoDocu from "./UserInfoDocu.jsx";
import UserInfoMessage from "./UserInfoMessage.jsx";

const commonNavCol = "col-6 nav-item nav-link ";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.nav = [
      { col1: { task: "待处理消息" } },
      { col2: { userList: "用户管理" } },
      { col3: { roleList: "角色管理" } },
      { col4: { serverList: "系统服务" } }
    ];
  }
  state = { index: 1 };
  componentDidMount() {
    this.doNavClick(this.nav.col1);
  }

  doNavClick = function(item) {
    if (item) {
      if (item.task) {
        this.setState({
          index: 1
        });
        ReactDOM.render(
          <ManageTask />,
          document.getElementById("manageContent")
        );
      } else if (item.userList) {
        this.setState({
          index: 2
        });
        ReactDOM.render(
          <ManageUserInfo />,
          document.getElementById("manageContent")
        );
      } else if (item.roleList) {
        this.setState({
          index: 3
        });
        ReactDOM.render(
          <ManageRoleInfo />,
          document.getElementById("manageContent")
        );
      } else {
        this.setState({
          index: 4
        });
        ReactDOM.render(
          <ManageServiceInfo />,
          document.getElementById("manageContent")
        );
      }
    }
  };

  render() {
    return (
      <BrowserRouter basename="/userInfo.html">
        <div className="container-fluid">
          <div className="row dv-user-info-title">
            <div
              className="col-10 alert alert-primary text-center"
              role="alert"
            >
              <span>
                <strong>
                  <Link to="/ddfd">历史文档信息</Link>
                </strong>
              </span>
            </div>
            <div className="col-2 alert alert-warning text-center">
              个人信息维护
            </div>
          </div>
          <div className="container-fluid">
            {/* <UserInfoDocu userId={this.props.userId} /> */}
            <UserInfoDocu userId={this.props.userId} />
            {/* <Route path="/ddfd" strict component={UserInfoDocu} />  <UserInfoMessage userId={this.props.userId} />*/}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default UserInfo;
