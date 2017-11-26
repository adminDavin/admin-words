import React from "react";
import logo from "../../style/logo.jpg";

export default class UserInfo extends React.Component {
  text = {
    left: "words-admin",
    search: "搜索",
    baidu: "百度",
    right: "管理员登录",
    regist: "用户注册"
  };

  render() {
    return (
      <div className="container-fluid dv-content">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              Active
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Link
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Link
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">
              Disabled
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
