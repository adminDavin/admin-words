import React from "react";

class ThContent extends React.Component {
  render() {
    let item = this.props.data;
    let isHidden = false;
    if (item.isHidden == true) {
      isHidden = true;
    }
    return (
      <thead>
        <tr>
          { item.map((pro, index) => {
              return <th key={ index }>
                       { pro.title }
                     </th>;
            }) }
        </tr>
      </thead>
      );
  }
}

export default ThContent;
