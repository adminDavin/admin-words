import React from "react";
import UserList from "./UserList.jsx";

class ManageUser extends React.Component {
  constructor(props) {
    super(props);
    let userState = [];
    if (this.props.flag) {
      userState = [0, 1, 2, 3, 6];
    } else {
      userState = [5];
    }
    this.state = {
      userState: userState,
      hidden: false
    };
  }

  onDoClickAction(flag, e) {
    if (flag == "manager") {
      this.setState({
        userState: [5]
      });
    } else {
      this.setState({
        userState: [2]
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div hidden={ this.props.flag }>
          <div className="row justify-content-end" style={ { marginLeft: 0, marginRight: 0 } }>
            <button type="button" className="btn btn-primary btn-sm dv-mr5" data-toggle="modal" onClick={ this.onDoClickAction.bind(this, "") }>
              添加管理员
            </button>
            <button type="button" className="btn btn-primary btn-sm dv-mr5" data-toggle="modal" onClick={ this.onDoClickAction.bind(this, "manager") }>
              管理员列表
            </button>
          </div>
        </div>
        <UserList manageId={ this.props.manageId } userState={ this.state.userState } flag={ this.props.flag } hidden={ this.state.hidden } isSelect={ this.state.hidden } />
      </div>
      );
  }
}

export default ManageUser;
