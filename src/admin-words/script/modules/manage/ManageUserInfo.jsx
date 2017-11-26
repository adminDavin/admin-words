import React from "react";

class ManageUserInfo extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <div className="nav flex-column nav-pills" role="tablist">
              <a className="nav-link active" role="tab" aria-selected="true">
                在线用户
              </a>
              <a className="nav-link" role="tab" aria-selected="false">
                注册用户
              </a>
              <a className="nav-link" role="tab" aria-selected="false">
                正常用户
              </a>
              <a className="nav-link" role="tab" aria-selected="false">
                异常用户
              </a>
              <a className="nav-link" role="tab" aria-selected="false">
                管理员
              </a>
            </div>
          </div>
          <div className="col-10" id="manageUserContent">
            ddd
          </div>
        </div>
      </div>
    );
  }
}

export default ManageUserInfo;
