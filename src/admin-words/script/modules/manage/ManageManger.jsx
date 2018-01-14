import React from "react";

class ManageManger extends React.Component {
  render() {
    let item = this.props.data;
    let index = this.props.index;
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{item.userName}</td>
        <td>{item.organize}</td>
        <td>{item.phone}</td>
        <td>{item.state}</td>
        <td>{item.acceptDate}</td>
        <td>{item.accepter}</td>
        <td>
          <button type="button" className="btn btn-outline-success btn-sm">
            处理
          </button>
        </td>
      </tr>
    );
  }
}

export default ManageManger;
