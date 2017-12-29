import React from "react";
import ReactDOM from "react-dom";
import utils from "../../utils.js";
import "bootstrap/dist/js/bootstrap.js";
import request from "../../sevice/request.js";
import crypto from "../../config/crypto.js";
import Modal from "./Modal.jsx";

class LoginInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isManage: false,
      forgetPassEleDisplay: {},
      userName: "",
      password: "",
      confirmPassword: "",
      variCode: "",
      hiddenSendVari: false,
      readOnlyInput: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(vari, event) {
    let data = {};
    data[vari] = event.target.value;
    this.setState(data);
  }
  loginAction() {
    let me = this;
    let userName = this.checkEmail();
    let password = this.checkPassword();

    if (password == "" || userName == "") {
      return false;
    }
    let params = {
      password: crypto.encodeBase64(password.content),
      isManage: me.state.isManage,
      loginName: userName.content
    };
    request.sendRequstNew("/admin/login", params, function(result) {
      if (result.code != "200") {
        alert(result.result);
      } else {
        let data = result.result.data;
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
  componentDidMount() {
    let me = this;
    $("#managerModalLong")
      .on("show.bs.modal", function(e) {
        me.setState({
          isManage: true,
          forgetPassEleDisplay: { display: "none" }
        });
      })
      .on("hidden.bs.modal", function(e) {
        me.setState({ isManage: false, forgetPassEleDisplay: {} });
      });
  }
  checkPassword() {
    let me = this;
    let password = utils.deleteSpaceStr(me.state.password);
    if (!password.valid) {
      alert("密码输入不合法，请确认");
      return "";
    }
    if (password.content != me.state.confirmPassword) {
      alert("两次输入的密码不一致，请确认");
      return "";
    }
    return password.content;
  }
  checkEmail() {
    let me = this;
    let userName = utils.isEmailStr(me.state.userName);
    if (!userName.valid) {
      alert("账号输入不合法，请确认");
      return "";
    }
    return userName.content;
  }
  modalAction(mine, event) {
    let me = mine;
    let userName = me.checkEmail();
    let password = me.checkPassword();
    if (password == "" || userName == "") {
      return false;
    }
    let params = {
      password: crypto.encodeBase64(password),
      loginName: userName
    };

    request.sendRequstNew("/admin/simpleRegist", params, function(result) {
      if (result.code != "200") {
        alert(result.result);
      } else {
        let data = result.result.data;
        alert("您已注册成功，请登录完善用户信息，以便管理员进行审核！");
        location.href =
          "/userInfo.html?userId=" +
          data.userId +
          "&key=" +
          data.key +
          "&loginName=" +
          data.loginName;
      }
    });
  }
  manageAction(mine, event) {}
  forgetPassAction(mine, event) {
    let me = mine;
    let userName = me.checkEmail();
    let password = me.checkPassword();
    let variCode = me.state.variCode;
    if (variCode == "") {
      alert("验证码未输入，请输入验证码");
      return false;
    }
    if (password == "" || userName == "") {
      return false;
    }
    let params = {
      password: crypto.encodeBase64(password),
      loginName: userName,
      variCode: variCode
    };

    request.sendRequstNew("/admin/modifyPass", params, function(result) {
      if (result.code != "200") {
        alert(result.result);
      } else {
        let data = result.result.data;
        alert("密码修改成功！");
      }
    });
  }

  sendVariCodeAction() {
    let me = this;
    let userName = this.checkEmail();
    if (userName == "") {
      return false;
    }

    $("#loading").modal("show");
    request.sendRequstNew(
      "/admin/sendVariCode",
      { loginName: userName },
      function(result) {
        setTimeout(() => {
          $("#loading").modal("hide");
        }, 1000);
        if (result.code != "200") {
          alert(result.result);
        } else {
          let data = result.result.data;
          me.setState({ hiddenSendVari: true, readOnlyInput: true });
          alert("验证码已发送成功，请查阅邮件查收");
        }
      }
    );
  }

  render() {
    const loginForm = (
      <form className="loginForm">
        <div className="row">
          <label className="col-form-label">账号</label>
          <input
            type="text"
            className="form-control"
            placeholder="name@example.com"
            value={this.state.userName}
            onChange={this.handleChange.bind(this, "userName")}
          />
        </div>
        <div className="row has-danger">
          <label className="col-form-label">密码</label>
          <input
            type="password"
            className="form-control form-control-danger"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange.bind(this, "password")}
          />
        </div>
        <div className="form-group row" style={{ marginTop: 30 }}>
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
            value={this.state.userName}
            onChange={this.handleChange.bind(this, "userName")}
          />
        </div>
        <div className="form-group row">
          <label className="col-3 col-form-label">登录密码</label>
          <input
            type="password"
            className="col-8 form-control"
            placeholder="密码长度不小于8位"
            value={this.state.password}
            onChange={this.handleChange.bind(this, "password")}
          />
        </div>
        <div className="form-group row">
          <label className="col-3 col-form-label">确认密码</label>
          <input
            type="password"
            className="col-8 form-control"
            placeholder="Password"
            value={this.state.confirmPassword}
            onChange={this.handleChange.bind(this, "confirmPassword")}
          />
        </div>
      </form>
    );

    const forgetPass = (
      <div className="card" style={{ height: 300, marginTop: 20 }}>
        <div className="container" style={{ marginTop: 0 }}>
          <form>
            <div className="container row">
              <label htmlFor="exampleInputEmail1">请输入账号</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="name@example.com"
                readOnly={this.state.readOnlyInput}
                value={this.state.userName}
                onChange={this.handleChange.bind(this, "userName")}
              />
            </div>
            <div className="row ">
              <label className="col-5">发送邮箱获取验证码？</label>
              <div className="col-3 text-right">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm dv-mt5"
                  style={{ width: 70 }}
                  hidden={this.state.hiddenSendVari}
                  onClick={this.sendVariCodeAction.bind(this)}
                >
                  确定
                </button>
              </div>
            </div>
            <div className="form-group dv-border-top30">
              <div className="row">
                <label className="col-sm-3 col-form-label">邮箱验证码</label>
                <input
                  type="text"
                  className="form-control col-sm-5 dv-mt5"
                  placeholder="邮箱验证码"
                  value={this.state.variCode}
                  onChange={this.handleChange.bind(this, "variCode")}
                />
              </div>
              <div className="row">
                <label className="col-sm-3 col-form-label">新密码</label>
                <input
                  type="password"
                  className="form-control col-sm-5 dv-mt5"
                  placeholder="密码长度不应小于8位"
                  value={this.state.password}
                  onChange={this.handleChange.bind(this, "password")}
                />
              </div>
              <div className="row">
                <label className="col-sm-3 col-form-label">密码确认</label>
                <input
                  type="password"
                  className="form-control col-sm-5 dv-mt5"
                  placeholder="密码确认"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange.bind(this, "confirmPassword")}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
    return (
      <div className="container">
        <div className="row justify-content-end dv-user-login">
          <div className="col-5" style={{ marginTop: 30 }}>
            <div className="row justify-content-end dv-login-title">
              <button
                type="button"
                className="col-3 btn btn-outline-info dv-mr10"
                data-toggle="modal"
                data-target="#registerModalLong"
              >
                新用户注册
              </button>
              <Modal
                modalEleId="registerModalLong"
                modalTitle="新用户注册"
                modalAction={this.modalAction}
                mine={this}
              >
                {register}
              </Modal>
              <button
                // hidden
                type="button"
                className="col-3 btn btn-outline-info"
                data-toggle="modal"
                data-target="#managerModalLong"
              >
                管理员登录
              </button>
              <Modal
                modalEleId="managerModalLong"
                modalTitle="管理员登录"
                modalAction={this.manageAction}
                mine={this}
              >
                {loginForm}
              </Modal>
            </div>
            <div
              className="form-group row justify-content-center"
              style={{ marginTop: 30 }}
            >
              <h1>用户登录</h1>
            </div>
            {loginForm}
            <div className="row">
              <label className="col col-form-label">
                <input type="checkbox" className="form-check-input" />
                记住我?
              </label>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-toggle="modal"
                data-target="#forgetPassModalLong"
              >
                忘记密码
              </button>
              <Modal
                modalEleId="forgetPassModalLong"
                modalTitle="忘记密码"
                modalAction={this.forgetPassAction}
                mine={this}
              >
                {forgetPass}
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginInfo;
