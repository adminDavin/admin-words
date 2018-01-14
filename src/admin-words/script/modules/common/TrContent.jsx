import React from "react";

class TrContent extends React.Component {
  render() {
    var item = this.props.data;
    console.log("dd");
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.createTime}</td>
        <td>{item.sale}</td>
      </tr>
    );
  }
}

export default TrContent;
