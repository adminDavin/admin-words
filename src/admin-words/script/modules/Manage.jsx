import React from "react";
import ReactDOM from "react-dom";
import ManageTask from "./manage/ManageTask.jsx";
import ManageServiceInfo from "./manage/ManageServiceInfo.jsx";
import ManageUserInfo from "./manage/ManageUserInfo.jsx";
import ManageRoleInfo from "./manage/ManageRoleInfo.jsx";

const commonNavCol = "col-6 nav-item nav-link ";

class Manage extends React.Component {
  constructor(props) {
    super(props);
    this.nav = {
      col1: { task: "待处理消息" },
      col2: { userList: "用户管理" },
      col3: { roleList: "角色管理" },
      col4: { serverList: "系统服务" }
    };
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
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse">
            <div className="navbar-nav">
              <a
                className={
                  commonNavCol +
                  "offset-md-7 " +
                  (this.state.index == 1 ? "active" : "")
                }
                onClick={this.doNavClick.bind(this, this.nav.col1)}
              >
                {this.nav.col1.task}
              </a>
              <a
                className={
                  commonNavCol + (this.state.index == 2 ? "active" : "")
                }
                onClick={this.doNavClick.bind(this, this.nav.col2)}
              >
                {this.nav.col2.userList}
              </a>
              <a
                className={
                  commonNavCol + (this.state.index == 3 ? "active" : "")
                }
                onClick={this.doNavClick.bind(this, this.nav.col3)}
              >
                {this.nav.col3.roleList}
              </a>
              <a
                className={
                  commonNavCol + (this.state.index == 4 ? "active" : "")
                }
                onClick={this.doNavClick.bind(this, this.nav.col4)}
              >
                {this.nav.col4.serverList}
              </a>
            </div>
          </div>
        </nav>
        <div className="container">
          <div id="manageContent" />
        </div>
      </div>
    );
  }
}
export default Manage;
