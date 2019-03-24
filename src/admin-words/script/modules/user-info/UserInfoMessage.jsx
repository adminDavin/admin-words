import React from "react";
import "bootstrap/dist/js/bootstrap.js";
import request from "../../sevice/request.js";
import "react-datepicker/dist/react-datepicker.css";
export default class UserInfoMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userAddress: "",
      userBirthDate: new Date(),
      userName: "",
      userNamePin: "",
      userOrganize: "",
      userPhone: "",
      userRemark: "申请备注",
      userState: true
    };
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleChangeDate = this
      .handleChangeDate
      .bind(this);
  }
  handleChange(vari, event) {
    let data = {};
    data[vari] = event.target.value;
    this.setState(data);
  }

  handleChangeDate(date) {
    if (!this.state.userState) {
      this.setState({
        userBirthDate: date
      });
    }
  }
  componentDidMount() {
    let me = this;
    request.sendRequstNew("/admin/getUserListByUserId", {
      userId: this.props.userId
    }, function(result) {
      if (result.code != "200") {
        alert(result.result);
      } else {
        let data = result.result.data;
        let userState = true;
        if (data.state != 1) {
          userState = false;
        }
        me.setState({
          userEmail: data.email,
          userAddress: data.address,
          userName: data.name,
          userNamePin: data.namePin,
          userOrganize: data.organize,
          userPhone: data.phone,
          userRemark: data.remark == null
            ? me.state.userRemark
            : data.remark,
          userState: userState
        });
      }
    });
  }

  baseAction(e) {
    
    let params = {
      userId: this.props.userId,
      name: this.state.userName,
      namepin: this.state.userNamePin,
      organize: this.state.userOrganize,
      phone: this.state.userPhone,
      sex: 1,
      birthDate: new Date(),
      remark: this.state.userRemark,
      address: this.state.userAddress
    };

    let flag = true;
    for (let item in params) {
      console.log(params[item]);
      if (params[item] == null || params[item].length === 0) {
        alert(item + " can't be null");
        return false;
      }
    }

    // console.log(params);
    if (flag) {
      request
        .sendRequstNew("/admin/updateUserInfo", params, function(result) {
          if (result.code != "200") {
            alert(result.result);
          } else {
            let data = result.result.data;
            alert("用户信息已更新");
          }
        });
    }
  }
  render() {
    return (
      <div className="container">
        <div className="alert alert-secondary dv-bot0 dv-mt5" role="alert" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample" href="#collapseUserInfoBase">
          基本信息
        </div>
        <div className="row" id="collapseUserInfoBase">
          <form className="col-7">
            <div className="row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                { "用户名" }
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control dv-mt5" placeholder="user name" value={ this.state.userEmail || "" } onChange={ this
                                                                                                                                             .handleChange
                                                                                                                                             .bind(this, "userEmail") } readOnly>
                                                                                                                                             </input>
                <small className="form-text text-muted">不可修改</small>
                                                                                                                                             
              </div>
              
            </div>
            <div className="row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                { "姓名" }
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control dv-mt5" placeholder="real name" value={ this.state.userName || "" } onChange={ this
                                                                                                                                            .handleChange
                                                                                                                                            .bind(this, "userName") } readOnly={ this.state.userState }
                ></input>
                <small className="form-text text-muted">必填选项</small>
              </div>
              
            </div>
            <div className="row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                { "姓名拼写" }
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control dv-mt5" placeholder="user name" onChange={ this
                                                                                                        .handleChange
                                                                                                        .bind(this, "userNamePin") } value={ this.state.userNamePin || "" } readOnly={ this.state.userState }
                />
                <small className="form-text text-muted">必填选项</small>
              </div>
            </div>
          </form>
        </div>
        <div className="alert alert-secondary dv-bot0 dv-mt5" role="alert" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample" href="#collapseUserInfoContact">
          联系方式
        </div>
        <div className="row" id="collapseUserInfoContact">
          <form className="col-7">
            <div className="row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                { "所属组织" }
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control dv-mt5" placeholder="organize" onChange={ this
                                                                                                       .handleChange
                                                                                                       .bind(this, "userOrganize") } value={ this.state.userOrganize || "" } readOnly={ this.state.userState }
                />
                <small className="form-text text-muted">必填选项</small>
              </div>
            </div>
            <div className="row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                { "用户地址" }
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control dv-mt5" placeholder="address" onChange={ this
                                                                                                      .handleChange
                                                                                                      .bind(this, "userAddress") } value={ this.state.userAddress || "" } readOnly={ this.state.userState }
                />
                <small className="form-text text-muted">必填选项</small>
              </div>
            </div>
            <div className="row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                { "联系电话" }
              </label>
              <div className="col-sm-4">
                <input type="text" className="form-control dv-mt5" placeholder="phone" onChange={ this
                                                                                                    .handleChange
                                                                                                    .bind(this, "userPhone") } value={ this.state.userPhone || "" } readOnly={ this.state.userState }
                />
                <small className="form-text text-muted">必填选项</small>
              </div>
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                { "邮箱" }
              </label>
              <div className="col-sm-4">
                <input type="text" className="form-control dv-mt5" placeholder="email" onChange={ this
                                                                                                    .handleChange
                                                                                                    .bind(this, "userEmail") } value={ this.state.userEmail || "" } readOnly
                />
                <small className="form-text text-muted">必填选项</small>
              </div>
            </div>
          </form>
        </div>
        <div className="alert alert-secondary dv-bot0 dv-mt5" role="alert" data-toggle="collapse" aria-expanded="false" aria-controls="collapseExample" href="#collapseUserInfoSelf">
          备注
        </div>
        <div className="row dv-mt5" id="collapseUserInfoSelf">
          <form className="col-10">
            <div className="row">
              <label className="text-center  col-sm-2 col-form-label alert-link">
                { "备注" }
              </label>
              <div className="col-sm-10">
                <textarea className="form-control" rows="3" onChange={ this
                                                                         .handleChange
                                                                         .bind(this, "userRemark") } value={ this.state.userRemark } readOnly={ this.state.userState } 
                />
                <small className="form-text text-muted">选填</small>
              </div>
            </div>
          </form>
        </div>
        <div className="row justify-content-center">
          <button type="button" className="col-1 btn btn-primary btn-lg btn-block dv-mr10" onClick={ this
                                                                                                       .baseAction
                                                                                                       .bind(this) }>
            保存
          </button>
        </div>
      </div>
      );
  }
}
