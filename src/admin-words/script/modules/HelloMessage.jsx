import React from "react";

export default class HelloMessage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="alert alert-primary">
          This is a primary alert—check it out!
        </div>
      </div>
    );
  }
}
