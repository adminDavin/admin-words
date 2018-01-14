import React from "react";
import utils from "../../utils.js";
class ManageUser extends React.Component {
  render() {
    let item = this.props.data;
    let index = this.props.index;
    let state = item.state == 0 ? "可用" : "不可用";
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.desc}</td>
        <td>{state}</td>
        <td>{utils.formatDate(item.createDate)}</td>
      </tr>
    );
  }
}

export default ManageUser;
