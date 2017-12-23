import React from "react";
export default class UserInfoDocu extends React.Component {
  constructor(props) {
    super(props);
    this.nav = [
      { col1: { task: "待处理消息" } },
      { col2: { userList: "用户管理" } },
      { col3: { roleList: "角色管理" } },
      { col4: { serverList: "系统服务" } }
    ];
  }

  render() {
    return (
      <div className="container">
        <div className="row">
        </div>
      </div>
    );
  }
}
