import React from "react";
import "bootstrap/dist/js/bootstrap.js";
import request from "../../sevice/request.js";
import utils from "../../utils.js";

export default class UserInfoMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
    this.handleChange = this.handleChange.bind(this);
  }
  checkIsNull(e) {
    if (e.target.value === "") {
      alert("不可以为空");
    }
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  componentDidMount() {
    console.log("dfdfd");
    let me = this;

    request.sendRequstNew(
      "/admin/getUserListByUserId",
      { userId: this.props.userId },
      function (result) {
        if (result.code != "200") {
          alert(result.result);
        } else {
          let data = result.result.data;
          me.setState({ data: data });
        }
      }
    );
  }
  baseAction(e) {
    console.log($("#collapseUserInfoBase")[0]);
  }
  render() {
    let user = this.state.data;
    console.log(user);
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
            <div className="form-group row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"用户名"}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control dv-mt5"
                  placeholder="user name"
                  value={user.email || ""}
                  onChange={this.checkIsNull.bind(this)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"姓名"}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control dv-mt5"
                  placeholder="real name"
                  value={user.name || ""}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"姓名拼写"}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control dv-mt5"
                  placeholder="user name"
                  value={user.namePin || ""}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"出生日期"}
              </label>
              <div className="col-sm-5">
                <input
                  type="text"
                  className="form-control dv-mt5"
                  placeholder=""
                  value={user.birthDate || ""}
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
            <div className="form-group row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"所属组织"}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control dv-mt5"
                  placeholder="organize"
                  value={user.organize || ""}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"用户地址"}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control dv-mt5"
                  placeholder="address"
                  value={user.address || ""}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"联系电话"}
              </label>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control dv-mt5"
                  placeholder="phone"
                  value={user.phone || ""}
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
                  value={user.email || ""}
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
          {" "}
          备注
        </div>
        <div className="row dv-mt5" id="collapseUserInfoSelf">
          <form className="col-10">
            <div className="form-group row">
              <label className=" text-center  col-sm-2 col-form-label alert-link">
                {"备注"}
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  rows="3"
                  value={user.remark || ""}
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
