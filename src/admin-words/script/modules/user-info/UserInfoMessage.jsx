import React from "react";
import "bootstrap/dist/js/bootstrap.js";
import request from "../../sevice/request.js";
import utils from "../../utils.js";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
export default class UserInfoMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userAddress: "",
      userBirthDate: moment(),
      userName: "",
      userNamePin: "",
      userOrganize: "",
      userPhone: "",
      userRemark: "申请备注"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }
  checkIsNull(e) {
    if (e.target.value === "") {
      alert("不可以为空");
    }
  }
  handleChange(vari, event) {
    let data = {};

    data[vari] = event.target.value;
    this.setState(data);

  }

  handleChangeDate(date) {
    console.log(date.utc());
    this.setState({
      userBirthDate: date
    });
  }
  componentDidMount() {
    let me = this;
    $("input[name='radio']").get(0).checked = true;
    request.sendRequstNew(
      "/admin/getUserListByUserId",
      { userId: this.props.userId },
      function (result) {
        if (result.code != "200") {
          alert(result.result);
        } else {
          let data = result.result.data;
          if (data.sex == 1) {
            $("input[name='radio']").get(0).checked = true;
          } else {
            $("input[name='radio']").get(1).checked = true;
          }
          me.setState({
            userEmail: data.email,
            userAddress: data.address,
            userBirthDate: data.birthDate,
            userName: data.name,
            userNamePin: data.namePin,
            userOrganize: data.organize,
            userPhone: data.phone,
            userRemark: data.remark
          });
        }
      }
    );
  }

  baseAction(e) {
    let sex = 0;
    if ($("input[name='radio']").get(0).checked) {
      sex = 1;
    }
    let params = {
      userId: this.props.userId,
      namepin: this.state.userNamePin,
      organize: this.state.userOrganize,
      phone: this.state.userPhone,
      remark: this.state.userRemark,
      address: this.state.userAddress,
      birthDate: this.state.userBirthDate
    };
    request.sendRequstNew("/admin/updateUserInfo", params, function (result) {
      if (result.code != "200") {
        alert(result.result);
      } else {
        let data = result.result.data;
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div
          className="alert alert-secondary dv-bot0 dv-mt5"
          role="alert"
          data-toggle="collapse"
          aria-expanded="false"
          aria-controls="collapseExample"
          href="#collapseUserInfoBase"
        >
          基本信息
        </div>
        <div className="row" id="collapseUserInfoBase">
          <form className="col-7">
            <div className="row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"用户名"}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control dv-mt5"
                  placeholder="user name"
                  value={this.state.userEmail || ""}
                  onChange={this.handleChange.bind(this, "userEmail")}
                  readOnly
                />
              </div>
            </div>
            <div className="row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"姓名"}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control dv-mt5"
                  placeholder="real name"
                  value={this.state.userName || ""}
                  onChange={this.handleChange.bind(this, "userName")}
                />
              </div>
            </div>
            <div className="row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"姓名拼写"}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control dv-mt5"
                  placeholder="user name"
                  onChange={this.handleChange.bind(this, "userNamePin")}
                  value={this.state.userNamePin || ""}
                />
              </div>
            </div>
            <div className="row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"出生日期"}
              </label>
              <div className="col-sm-5">
                <DatePicker className="form-control dv-mt5"
                  selected={this.state.userBirthDate}
                  onChange={this.handleChangeDate}
                />
              </div>
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"性别"}
              </label>
              <div className="col-sm-3 dv-mt5">
                <label className="custom-control custom-radio">
                  <input
                    id="radio1"
                    name="radio"
                    type="radio"
                    className="custom-control-input"
                  />
                  <span className="custom-control-indicator" />
                  <span className="custom-control-description">男</span>
                </label>
                <label className="custom-control custom-radio">
                  <input
                    id="radio2"
                    name="radio"
                    type="radio"
                    className="custom-control-input"
                  />
                  <span className="custom-control-indicator" />
                  <span className="custom-control-description">女</span>
                </label>
              </div>
            </div>
          </form>
        </div>
        <div
          className="alert alert-secondary dv-bot0 dv-mt5"
          role="alert"
          data-toggle="collapse"
          aria-expanded="false"
          aria-controls="collapseExample"
          href="#collapseUserInfoContact"
        >
          联系方式
        </div>
        <div className="row" id="collapseUserInfoContact">
          <form className="col-7">
            <div className="row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"所属组织"}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control dv-mt5"
                  placeholder="organize"
                  onChange={this.handleChange.bind(this, "userOrganize")}
                  value={this.state.userOrganize || ""}
                />
              </div>
            </div>
            <div className="row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"用户地址"}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control dv-mt5"
                  placeholder="address"
                  onChange={this.handleChange.bind(this, "userAddress")}
                  value={this.state.userAddress || ""}
                />
              </div>
            </div>
            <div className="row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"联系电话"}
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control dv-mt5"
                  placeholder="phone"
                  onChange={this.handleChange.bind(this, "userPhone")}
                  value={this.state.userPhone || ""}
                />
              </div>
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"邮箱"}
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control dv-mt5"
                  placeholder="email"
                  onChange={this.handleChange.bind(this, "userEmail")}
                  value={this.state.userEmail || ""}
                  readOnly
                />
              </div>
            </div>
          </form>
        </div>
        <div
          className="alert alert-secondary dv-bot0 dv-mt5"
          role="alert"
          data-toggle="collapse"
          aria-expanded="false"
          aria-controls="collapseExample"
          href="#collapseUserInfoSelf"
        >
          备注
        </div>
        <div className="row dv-mt5" id="collapseUserInfoSelf">
          <form className="col-10">
            <div className="row">
              <label className="text-center  col-sm-2 col-form-label alert-link">
                {"备注"}
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  rows="3"
                  onChange={this.handleChange.bind(this, "userRemark")}
                  value={this.state.userRemark}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="row justify-content-center">
          <button
            type="button"
            className="col-1 btn btn-primary btn-lg btn-block dv-mr10"
            onClick={this.baseAction.bind(this)}
          >
            保存
          </button>
        </div>
      </div>
    );
  }
}
