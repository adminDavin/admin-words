import React from "react";
export default class UserChangePass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "fdfgfsgdf"
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(vari, event) {
    let data = {};
    data[vari] = event.target.value;
    this.setState(data);
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center" style={{ height: 500, marginTop: 15, marginBottom: 15 }}>
          <div className="card" style={{ width: 600 }}>
            <div className="card-header text-center">修改用户密码</div>
            <div className="card-body">
              <form>
                <div className="form-group row">
                  <label htmlFor="staticEmail" className="col-sm-2 col-form-label">邮箱</label>
                  <div className="col-sm-10">
                    <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value="email@example.com" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword" className="col-sm-2 col-form-label">旧密码</label>
                  <div className="col-sm-10">
                    <input type="password" className="form-control" placeholder="Password" value={this.state.oldPassword} onChange={this.handleChange.bind(this, "oldPassword")} readOnly />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword" className="col-sm-2 col-form-label">新密码</label>
                  <div className="col-sm-10">
                    <input type="password" className="form-control" placeholder="密码长度不小于8位" onChange={this.handleChange.bind(this, "newPassword")} value={this.state.newPassword} />
                  </div>
                </div>
              </form>
            </div>
            <div className="card-footer text-center"><button type="button" className="btn btn-primary">确定修改</button></div>
          </div>
        </div>
      </div>
    );
  }
}
