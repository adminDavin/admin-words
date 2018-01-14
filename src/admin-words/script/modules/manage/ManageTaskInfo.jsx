import React from "react";

class ManageTaskInfo extends React.Component {
  render() {
    let item = this.props.data;
    let index = this.props.index;
    let state = item.state == 0 ? "新注册，但未更新个人信息" : "新注册待审核";
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.taskName}</td>
        <td>{item.taskType}</td>
        <td>{item.createTime}</td>
        <td>{state}</td>
        <td>{item.applyer}</td>
        <td>
          <button type="button" className="btn btn-outline-success btn-sm">
            处理
          </button>
        </td>
      </tr>
    );
  }
}

export default ManageTaskInfo;
