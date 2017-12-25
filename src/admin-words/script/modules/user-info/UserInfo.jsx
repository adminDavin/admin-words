import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import UserInfoDocu from "./UserInfoDocu.jsx";
import UserInfoMessage from "./UserInfoMessage.jsx";
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
              <a className="nav-link active" href="#doc">
                <h5>历史文档信息</h5>
              </a>
              <a className="nav-link" href="#user">
                <h5>个人信息维护</h5>
              </a>
            </nav>
          </div>
          <div className="container-fluid">
            {/* <UserInfoDocu userId={this.props.userId} /> */}
            <Link to="#doc" activeStyle={{ color: "red" }}>
              <UserInfoDocu userId={this.props.userId} />
            </Link>
            <Link to="#user" activeStyle={{ color: "red" }}>
              <UserInfoMessage userId={this.props.userId} />
            </Link>
            {/* <Route path="/ddfd" strict component={UserInfoDocu} />  <UserInfoMessage userId={this.props.userId} />*/}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default UserInfo;
