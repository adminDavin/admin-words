import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import UserInfoDocu from "./UserInfoDocu.jsx";
import UserInfoMessage from "./UserInfoMessage.jsx";
import UserChangePass from "./UserChangePass.jsx";

import "bootstrap/dist/js/bootstrap.js";
const commonNavCol = "col-6 nav-item nav-link ";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $(function() {
      $('[data-toggle="popover"]').popover();
    });
  }

  render() {
    return (
      <BrowserRouter basename="/userInfo.html">
        <div className="container-fluid">
          <div className="row dv-user-info-title">
            <nav className="nav ustify-content-end">
              <a
                className="flex-sm-fill text-sm-center nav-link active"
                data-toggle="tab"
                href="#doc"
                role="tab"
              >
                <h5>历史文档信息</h5>
              </a>
              <a
                className="flex-sm-fill text-sm-center nav-link"
                data-toggle="tab"
                href="#user"
                role="tab"
              >
                <h5>个人信息维护</h5>
              </a>
              <a
                className="flex-sm-fill text-sm-center nav-link"
                data-toggle="tab"
                href="#pass"
                role="tab"
              >
                <h5>修改密码</h5>
              </a>
            </nav>
          </div>
          <div className="container-fluid">
            <div className="tab-content">
              <div className="tab-pane active" id="doc" role="tabpanel">
                <UserInfoDocu userId={this.props.userId} />
              </div>
              <div className="tab-pane" id="user" role="tabpanel">
                <UserInfoMessage userId={this.props.userId} />
              </div>
              <div className="tab-pane" id="pass" role="tabpanel">
                <UserChangePass
                  userId={this.props.userId}
                  loginName={this.props.loginName}
                />
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default UserInfo;
