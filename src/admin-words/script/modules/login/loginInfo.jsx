import React from "react";
import ReactDOM from "react-dom";
import utils from "../../utils.js";
import "bootstrap/dist/js/bootstrap.js";
import request from "../../sevice/request.js";
import crypto from "../../config/crypto.js";

class LoginInfo extends React.Component {
  constructor(props) {
    super(props);
    this.nav = [
      { col1: { task: "待处理消息" } },
      { col2: { userList: "用户管理" } },
      { col3: { roleList: "角色管理" } },
      { col4: { serverList: "系统服务" } }
    ];
  }
  loginAction() {
    let me = this;
    let form = $("#loginForm");
    let inputList = form.find("input");
    let params = {};
    let flag = false;
    for (let item of inputList) {
      let value = item.value;
      if (item.type == "text") {
        let value = utils.isEmailStr(item.value);
        if (!value.valid) {
          alert("账号输入不合法，请确认");
          return false;
        }
        params["loginName"] = value.content;
      } else {
        let value = utils.deleteSpaceStr(item.value);
        if (!value.valid) {
          alert("密码输入不合法，请确认");
          return false;
        }
        params["password"] = crypto.encodeBase64(value.content);
        flag = true;
      }
    }
    if (flag) {
      request.sendRequstNew("/admin/login", params, function(result) {
        if (result.code != "200") {
          alert(result.result);
        } else {
          let data = result.result.data;
          console.log(data);
          location.href =
            "/userInfo.html?userId=" +
            data.userId +
            "&key=" +
            data.key +
            "&loginName=" +
            data.loginName;

          me.setState({ data: data });
        }
      });
    }
  }
  modalAction(flagging, event) {
    let me = this;
    let form = $("#modalForm");
    let inputList = form.find("input");
    let params = {};
    if (flagging === "register") {
      let password = "";
      let flag = false;
      for (let item of inputList) {
        let value = item.value;
        if (item.type == "text") {
          let value = utils.isEmailStr(item.value);
          if (!value.valid) {
            alert("账号输入不合法，请确认");
            return false;
          }
          params["loginName"] = value.content;
        } else {
          let value = utils.deleteSpaceStr(item.value);
          if (!value.valid) {
            alert("密码输入不合法，请确认");
            return false;
          }
          if (password === "") {
            password = value.content;
          } else if (password != value.content) {
            alert("密码输入不一致，请确认");
            return false;
          }
          params["password"] = crypto.encodeBase64(value.content);
          flag = true;
        }
      }
      if (flag) {
        request.sendRequstNew("/admin/simpleRegist", params, function(result) {
          if (result.code != "200") {
            alert(result.result);
          } else {
            let data = result.result.data;
            alert("您已注册成功，请登录完善用户信息，以便管理员进行审核！");
          }
        });
      }
    }
  }
  render() {
    const loginForm = (
      <form id="loginForm">
        <div className="form-group row justify-content-center">
          <h1>用户登录</h1>
        </div>
        <div className="form-group row">
          <label className="col-form-label">账号</label>
          <input
            type="text"
            className="form-control"
            placeholder="name@example.com"
          />
        </div>
        <div className="form-group row has-danger">
          <label className="col-form-label">密码</label>
          <input
            type="password"
            className="form-control form-control-danger"
            placeholder="Password"
          />
        </div>
        <div className="form-group row">
          <button
            type="button"
            className="btn btn-dark btn-lg btn-block"
            onClick={this.loginAction.bind(this)}
          >
            登录
          </button>
        </div>
      </form>
    );
    const register = (
      <form className="dv-modal-register">
        <div className="form-group row has-success">
          <label className="col-3 col-form-label">注册邮箱</label>
          <input
            type="text"
            className="col-8 form-control form-control-success"
            placeholder="name@example.com"
          />
        </div>
        <div className="form-group row">
          <label className="col-3 col-form-label">登录密码</label>
          <input
            type="password"
            className="col-8 form-control"
            placeholder="Password"
          />
        </div>
        <div className="form-group row">
          <label className="col-3 col-form-label">确认密码</label>
          <input
            type="password"
            className="col-8 form-control"
            placeholder="Password"
          />
        </div>
      </form>
    );
    const modelEle = (
      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog dv-modal" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{"新用户注册"}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" id="modalForm">
              {register}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.modalAction.bind(this, "register")}
              >
                {"确定"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                {"取消"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="container">
        <div className="row justify-content-end dv-user-login">
          <div className="col-5">
            <div className="row justify-content-end dv-login-title">
              <button
                type="button"
                className="col-3 btn btn-outline-info dv-mr10"
                data-toggle="modal"
                data-target="#exampleModalLong"
              >
                新用户注册
              </button>
              <button
                type="button"
                className="col-3 btn btn-outline-info"
                data-toggle="modal"
                data-target="#exampleModalLong"
              >
                管理员登录
              </button>
            </div>
            {loginForm}
          </div>
        </div>
        {modelEle}
      </div>
    );
  }
}
export default LoginInfo;
