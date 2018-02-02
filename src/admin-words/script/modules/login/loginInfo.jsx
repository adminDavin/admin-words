import React from "react";
import ReactDOM from "react-dom";
import utils from "../../utils.js";
import "bootstrap/dist/js/bootstrap.js";
import request from "../../sevice/request.js";
import crypto from "../../config/crypto.js";
import Modal from "./Modal.jsx";
import routeInfo from "../../config/routerConfig.js";

const modalActionMap = {
  register: { name: "register", title: "注册新账号" },
  forgotPassword: { name: "forgotPass", title: "重置密码" },
  magageLogin: { name: "manager" }
};

const checkUserInfo = function (params) {
  let flag = true;
  let newParams = [];
  for (let j = 0; j < params.length; j++) {
    let item = params[j];
    let value = "";
    if (item.type == 'email') {
      value = utils.checkIsEmail(item.value);
      if (value == "") {
        return null;
      }
    } else if (item.type == 'pass') {
      value = utils.checkIsNull(item.value, false);
      if (value == "") {
        return null;
      }
    } else if (item.type == 'text') {
      value = utils.checkIsNull(item.value, true);
      if (value == "") {
        return null;
      }
    }
    newParams.push({ name: item.name, type: item.type, value: value });
  }
  return newParams;
};


class ManageLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forgetPassEleDisplay: {},
      userName: "",
      password: "",
      confirmPassword: "",
      variCode: "",
      hiddenSendVari: false,
      modalFlag: ""
    };
  }

  clearValue() {
    this.setState(
      {
        forgetPassEleDisplay: {},
        userName: "",
        password: "",
        confirmPassword: "",
        variCode: "",
        hiddenSendVari: false,
        modalFlag: ""
      }
    );
  }

  handleChange(vari, event) {
    let data = {};
    data[vari] = utils.trim(event.target.value);
    this.setState(data);
  }


  loginAction() {
    let params = [{ name: 'userName', type: 'email', value: this.state.userName }, { name: 'password', type: 'pass', value: this.state.password }];
    let newParams = checkUserInfo(params);
    if (newParams == null) {
      return;
    }
    let userName = newParams[0].value;
    let password = newParams[1].value;

    let me = this;
    $("#loading").modal("show");
    request.sendRequstNew(
      "/admin/login",
      {
        password: crypto.encodeBase64(password),
        isManage: me.props.isManage,
        loginName: userName
      },
      function (result) {
        setTimeout(() => {
          $("#loading").modal("hide");
          me.clearValue();
        }, 1000);
        if (result.code != "200") {
          alert(result.result);
        } else {
          let data = result.result.data;
          if (me.state.isManage == true) {
            location.href = "/manager.html?userId=" + data.userId + "&key=" + data.key + "&loginName=" + data.loginName + "&isManage=" + me.props.isManage;
            return false;
          } else {
            location.href = "/userInfo.html?userId=" + data.userId + "&key=" + data.key + "&loginName=" + data.loginName;
          }
        }
      }
    );
  }
  sendVariCodeAction(event) {
    let params = [{ name: 'userName', type: 'email', value: this.state.userName }];
    let newParams = checkUserInfo(params);
    if (newParams == null) {
      return;
    }
    let userName = newParams[0].value;
    $("#loading").modal("show");
    request.sendRequstNew(
      "/admin/sendVariCode",
      { loginName: userName },
      function (result) {
        setTimeout(() => {
          $("#loading").modal("hide");
        }, 1000);
        if (result.code != "200") {
          alert(result.result);
        } else {
          let data = result.result.data;
          me.setState({ hiddenSendVari: true, readOnlyInput: true });
          alert("验证码已发送成功，请查阅邮件查看验证码");
        }
      }
    );

  }
  modalAction(mine, event) {
    let params = [{ name: 'userName', type: 'email', value: mine.state.userName },
    { name: 'password', type: 'pass', value: mine.state.password },
    { name: 'confirmPassword', type: 'pass', value: mine.state.confirmPassword }
    ];
    if (mine.state.modalFlag == modalActionMap.forgotPassword.name) {
      params.push({ name: 'variCode', type: 'text', value: mine.state.variCode });
    }
    mine.clearValue();
    let newParams = checkUserInfo(params);
    if (newParams == null) {
      return;
    }

    let requestParams = {};
    for (let j = 0; j < newParams.length; j++) {
      let item = newParams[j];
      if (item.name == 'password' || item.name == 'confirmPassword') {
        requestParams[item.name] = crypto.encodeBase64(item.value);
      } else {
        requestParams[item.name] = item.value;
      }
    }
    console.log(requestParams);
    if (requestParams.password != requestParams.confirmPassword) {
      alert("两次密码输入不一致，请确认");
      return;
    }
    delete requestParams.confirmPassword;
    if (mine.state.modalFlag == modalActionMap.forgotPassword.name) {
      request.sendRequstNew("/admin/modifyPass", requestParams, function (result) {
        if (result.code != "200") {
          alert(result.result);
        } else {
          let data = result.result.data;
          alert("密码修改成功！");
        }
      });
    } else {
      request.sendRequstNew("/admin/simpleRegist", requestParams, function (result) {
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
  }
  closeAction(mine, event) {
    mine.clearValue();
  }

  goToLocation(flag, me) {
    if (modalActionMap.magageLogin.name == flag) {
      if (this.props.isManage) {
        window.location = location.pathname
      } else {
        window.location = location.pathname + "?action=manager";
      }
    } else {
      this.setState({ modalFlag: flag });
    }
  }

  registerContent() {
    let showVariCode = false;
    if (this.state.modalFlag == modalActionMap.register.name) {
      showVariCode = true;
    }
    return <form className="dv-modal-register">
      <div className="form-group row justify-content-center has-success">
        <label className="col-auto col-form-label col-form-label-sm">注册邮箱</label>
        <div className="col-sm-9">
          <input type="email" className="form-control form-control-sm"
            placeholder="name@example.com"
            value={this.state.userName}
            onChange={this.handleChange.bind(this, "userName")}
          />
        </div>
      </div>
      <div className="form-group row" hidden={showVariCode}>
        <label className="col-auto col-form-label col-form-label-sm">获取邮箱验证码</label>
        <button
          type="button"
          className="col-auto btn btn-primary btn-sm dv-mt5"
          hidden={this.state.hiddenSendVari}
          onClick={this.sendVariCodeAction.bind(this)}
        >
          确定
          </button>
        <div className="col-auto row">
          <label className="col-auto col-form-label col-form-label-sm">输入邮箱验证码:</label>
          <input type="text" className="col-5 form-control form-control-sm"
            placeholder="邮箱验证码"
            value={this.state.variCode}
            onChange={this.handleChange.bind(this, "variCode")}
          />
        </div>
      </div>
      <div className="form-group row justify-content-center">
        <label className="col-auto col-form-label col-form-label-sm">登录密码</label>
        <div className="col-sm-9">
          <input type="password" className="form-control form-control-sm"
            placeholder="密码长度不小于8位"
            value={this.state.password}
            onChange={this.handleChange.bind(this, "password")}
          />
        </div>
      </div>
      <div className="form-group row justify-content-center">
        <label className="col-auto col-form-label col-form-label-sm">密码确认</label>
        <div className="col-sm-9">
          <input type="password" className="form-control form-control-sm"
            value={this.state.confirmPassword}
            onChange={this.handleChange.bind(this, "confirmPassword")}
          />
        </div>
      </div>
    </form>;
  }


  getModal() {
    let title = "";
    if (this.state.modalFlag == modalActionMap.register.name) {
      title = modalActionMap.register.title;
    }

    if (this.state.modalFlag == modalActionMap.forgotPassword.name) {
      title = modalActionMap.forgotPassword.title;
    }

    let content = this.registerContent();
    return (<Modal
      modalEleId="registerModalLong"
      modalTitle={title}
      modalAction={this.modalAction}
      modalColseAction={this.closeAction}
      mine={this}
    >
      {content}
    </Modal>
    );
  }
  render() {
    let label1 = "用户登录";
    let label2 = "管理员登录";

    if (this.props.isManage) {
      label1 = "管理员登录";
      label2 = "用户登录";
    }

    return (
      <div className={this.props.isManage ? 'dv-manager' : 'dv-user'}>
        {this.getModal()}
        <h3 className="text-center">{label1}</h3>
        <hr className="my-2" />
        <form >
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="col-form-label">
              <span className="dv-mr10">账号</span>
              <button type="button" className="btn btn-outline-info btn-sm"
                onClick={this.goToLocation.bind(this, modalActionMap.register.name)}
                data-toggle="modal"
                data-target="#registerModalLong"
                hidden={this.props.isManage}
              >
                没有账号,新注册一个？
              </button>
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="name@example.com"
              value={this.state.userName}
              onChange={this.handleChange.bind(this, "userName")}
            />
          </div>
          <div className="form-group">
            <label className="col-form-label">
              <span className="dv-mr10">密码</span>
              <button type="button" className="btn btn-outline-info btn-sm"
                data-toggle="modal"
                data-target="#registerModalLong"
                onClick={this.goToLocation.bind(this, modalActionMap.forgotPassword.name)}
              >
                忘记密码？
              </button>
            </label>
            <input
              type="password"
              className="form-control form-control-sm form-control-danger"
              value={this.state.password}
              onChange={this.handleChange.bind(this, "password")}
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-info btn-sm btn-block"
              onClick={this.loginAction.bind(this)}
            >
              登录
        </button>
          </div>
        </form>
        <div className="row justify-content-around">
          <label className="col-3">
            <input type="checkbox" className="form-check-input" />
            <span>记住我?</span>
          </label>
          <div className="col-2 align-self-end">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={this.goToLocation.bind(this, modalActionMap.magageLogin.name)}
            >
              {label2}
            </button>
          </div>
        </div>
      </div>
    );
  }
};


class LoginInfo extends React.Component {
  constructor(props) {
    super(props);
    let params = routeInfo.getParamData();
    let isManage = true;
    if (params.action == undefined) {
      isManage = false;
    }
    this.state = {
      isManage: isManage,
      forgetPassEleDisplay: {},
      confirmPassword: "",
      variCode: "",
      hiddenSendVari: false,
      readOnlyInput: false
    };
  }


  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-5 jumbotron dv-jumbotron-t20-p2" style={{ marginTop: 20 }}>
            <ManageLogin isManage={this.state.isManage} />
          </div>
        </div>
      </div>
    );
  }
}
export default LoginInfo;
