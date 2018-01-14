import React from "react";

class ThContent extends React.Component {
  render() {
    var item = this.props.data;
    return (
      <thead>
        <tr>
          {item.map((pro, index) => {
            return <th key={index}>{pro.title}</th>;
          })}
        </tr>
      </thead>
    );
  }
}

export default ThContent;
