import React from "react";
import utils from "../../utils.js";
import request from "../../sevice/request.js";
import crypto from "../../config/crypto.js";

const deleteSpaceStr = function (str, flag) {
  let strForm = str.replace(/\s+/g, "");
  let valid = false;

  if (strForm.length > 8 || flag) {
    valid = true;
  }
  return {
    content: strForm,
    valid: valid
  };
};

export default class UserChangePass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      loginName: this.props.loginName
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(vari, event) {
    let data = {};
    data[vari] = event.target.value;
    this.setState(data);
  }
  ClickAction() {
    let oldPassword = deleteSpaceStr(this.state.oldPassword);
    if (!oldPassword.valid) {
      alert("密码输入不合法，请确认");
      return false;
    }
    let newPassword = deleteSpaceStr(this.state.newPassword);
    if (!newPassword.valid) {
      alert("密码输入不合法，请确认");
      return false;
    }
    let params = {
      oldPassword: crypto.encodeBase64(oldPassword.content),
      newPassword: crypto.encodeBase64(newPassword.content),
      loginName: this.state.loginName
    }; 
    request.sendRequstNew("/admin/modifyPass", params, function(result) {
      if (result.code != "200") {
        alert(result.result);
      } else {
        alert("更新密码成功");
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div
          className="row justify-content-center"
          style={{ height: 500, marginTop: 15, marginBottom: 15 }}
        >
          <div className="card" style={{ width: 600 }}>
            <div className="card-header text-center">修改用户密码</div>
            <div className="card-body">
              <form>
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                  >
                    邮箱
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      id="staticEmail"
                      value={this.state.loginName.replace("%2540","@")} 
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    旧密码
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={this.state.oldPassword}
                      onChange={this.handleChange.bind(this, "oldPassword")}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
                    新密码
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="密码长度不小于8位"
                      onChange={this.handleChange.bind(this, "newPassword")}
                      value={this.state.newPassword}
                    />
                  </div>
                </div>
                
                <div className="row justify-content-center">
                  <label className="col-auto col-form-label col-form-label-sm">输入邮箱验证码:</label>
                  <input type="text" className="col-5 form-control form-control-sm"
                    placeholder="邮箱验证码"
                    value={this.state.variCode}
                    onChange={this.handleChange.bind(this, "variCode")}
                  />
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.ClickAction.bind(this)}
              >
                确定修改
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
