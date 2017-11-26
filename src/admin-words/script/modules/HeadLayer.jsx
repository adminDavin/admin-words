import React from "react";
import logo from "../../style/logo.jpg";

export default class HeadLayer extends React.Component {
  text = {
    left: "words-admin",
    search: "搜索",
    baidu: "百度",
    right: "管理员登录",
    regist: "用户注册"
  };

  managelogin = function() {
    console.log("login ");
  };
  render() {
    return (
      <div className="container-fluid row dv-header">
        <div className="row col-sm-12 col-md-10 justify-content-center">
          <img className="dv-logo col-md-1" src={logo} alt="" />
          <div className="col-md-2">{this.text.left}</div>
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon1">
                <a href="http://www.baidu.com/" />
                {this.text.baidu}
              </span>
              <input
                type="text"
                className="form-control"
                placeholder={this.text.search}
                aria-label="search"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-2">
          <div className="row">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={this.managelogin}
            >
              {this.text.right}
            </button>
            <button type="button" className="btn btn-outline-primary">
              {this.text.regist}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
