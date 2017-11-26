import React from "react";
import ReactDOM from "react-dom";

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.nav = {
      col1: { task: "待处理消息" },
      col2: { userList: "用户管理" },
      col3: { roleList: "角色管理" },
      col4: { serverList: "系统服务" }
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-end dv-user-login">
          <div className="col-4">
            <form>
              <div className="form-group row justify-content-center">
                <span className="display-4">登录</span>
              </div>
              <div className="form-group row">
                <label className="col-form-label">账号</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="form-group row">
                <label className="col-form-label">密码</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="form-group row">
                <button type="button" className="btn btn-dark btn-lg btn-block">
                  登录
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default UserLogin;
