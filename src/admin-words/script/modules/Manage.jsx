import React from "react";
import ReactDOM from "react-dom";
import ManageTask from "./manage/ManageTask.jsx";

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
  componentDidMount() {
    this.doNavClick(this.nav.col1);
  }

  doNavClick = function(item) {
    console.log("click....", item);
    console.log(this);
    if (item) {
      if (item.task) {
        ReactDOM.render(
          <ManageTask />,
          document.getElementById("manageContent")
        );
      } else if (item.userList) {
        ReactDOM.render(<div />, document.getElementById("manageContent"));
      } else if (item.roleList) {
        ReactDOM.render(<div />, document.getElementById("manageContent"));
      } else {
        ReactDOM.render(<div />, document.getElementById("manageContent"));
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
                  "col-6 nav-item nav-link offset-md-7" + " " + "active"
                }
                onClick={this.doNavClick.bind(this, this.nav.col1)}
              >
                {this.nav.col1.task}
              </a>
              <a
                className="col-6 nav-item nav-link"
                onClick={this.doNavClick.bind(this, this.nav.col2)}
              >
                {this.nav.col2.userList}
              </a>
              <a
                className="col-6 nav-item nav-link"
                onClick={this.doNavClick.bind(this, this.nav.col3)}
              >
                {this.nav.col3.roleList}
              </a>
              <a
                className="col-6 nav-item nav-link"
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
