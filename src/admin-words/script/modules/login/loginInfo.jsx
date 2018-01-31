import React from "react";
import ReactDOM from "react-dom";
import utils from "../../utils.js";
import "bootstrap/dist/js/bootstrap.js";
import request from "../../sevice/request.js";
import crypto from "../../config/crypto.js";
import Modal from "./Modal.jsx"; 
import routeInfo from "../../config/routerConfig.js";

const modalActionMap = {
  register: {name:"register",title:"注册新账号"},
  forgotPassword: { name: "forgotPass", title: "重置密码" },
  magageLogin: {name:"manager"}
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

  handleChange(vari, event) {
    let data = {};
    data[vari] = event.target.value;
    this.setState(data);
  }

  loginAction() { 

  }
  goToLocation(flag, me) { 
    if (modalActionMap.magageLogin.name == flag) { 
      if (this.props.isManage) {
        window.location = location.pathname
      } else { 
        window.location =location.pathname+"?action=manager";
      } 
    } else { 
      this.setState({modalFlag: flag});
    } 
  }
  sendVariCodeAction() { 
    console.log("dd");
  }
  registerContent() {
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
      <div className="form-group row">
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
            value={this.state.password}
            onChange={this.handleChange.bind(this, "confirmPassword")}
          />
        </div>
      </div>    
    </form>;
  } 

  modalAction() { }
  closeAction() { }
  getModal( ) { 
    let content = "";
    let title = "";

    if (this.state.modalFlag == modalActionMap.register.name) { 
        title = modalActionMap.register.title;
        content = this.registerContent();
    }

    if (this.state.modalFlag == modalActionMap.forgotPassword.name) { 
        title = modalActionMap.forgotPassword.title;
        content = this.registerContent();
    }

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
      <div className={this.props.isManage?'dv-manager':'dv-user'}>
        {this.getModal()}
        <h3 className="text-center">{label1}</h3>
        <hr className ="my-2"/>
        <form >
          <div className="form-group"  style={{marginBottom:0}}>
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
    if (params.action==undefined) {
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
          <div className="col-5 jumbotron dv-jumbotron-t20-p2" style={{marginTop:20}}> 
            <ManageLogin isManage={this.state.isManage}/>   
          </div>   
        </div>
      </div>
    );
  }
}
export default LoginInfo;
