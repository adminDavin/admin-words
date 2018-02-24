import React from "react";
import TrContent from "../common/TrContent.jsx";
import ThContent from "../common/ThContent.jsx";
import ManageTaskInfo from "./ManageTaskInfo.jsx";
import ManageTableTaskInfo from "./ManageTableTaskInfo.jsx";

import ManageUser from "./ManageUser.jsx";
import ManageAuthInfo from "./ManageAuthInfo.jsx";
import ServiceInfo from "./ServiceInfo.jsx";
import UserList from "./UserList.jsx";
import request from "../../sevice/request.js";

class ManageTabContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.flashTabContent();
  }

  flashTabContent() {
    let me = this;
    if (this.props.dataSource == null) {
      this.state = {
        data: []
      };
      return;
    }
    $("#loading").modal("show");
    request.sendRequstNew(
      this.props.dataSource.url,
      {
        userState: JSON.stringify(this.props.dataSource.params)
      },
      function(result) {
        setTimeout(() => {
          $("#loading").modal("hide");
        }, 1000);
        if (result.code != "200") {
          alert(result.result);
        } else {
          let data = result.result.data;
          let resultData = data.map((item, index) => {
            if (item.state == 0) {
              item["taskName"] = "待审核用户";
              item["taskType"] = "注册申请";
              item["createTime"] = item.applyDate;
              item["applyer"] = item.email;
              item["accepter"] = item.accepterId;
            }
            return item;
          });
          me.setState({
            data: resultData
          });
          $("#loading").modal("hide");
        }
      }
    );
  }

  getThData() {
    let userState = [2];
    if (this.props.name === "taskInfo") {
      return (<ManageTableTaskInfo manageId={ this.props.manageId } data={ this.state.data } colum={ this.props.colum } />);
    } else if (this.props.name === "userInfo") {
      return (<ManageUser manageId={ this.props.manageId } flag={ true } />);
    } else if (this.props.name === "managerInfo") {
      return (<ManageUser manageId={ this.props.manageId } flag={ false } />);
    } else if (this.props.name === "authInfo") {
      return (<ManageAuthInfo manageId={ this.props.manageId } />);
    } else if (this.props.name === "serviceInfo") {
      return (<ServiceInfo roleId="0" manageId={ this.props.manageId } />);
    } else if (this.props.name === "userList") {
      return (<UserList className="container" manageId={ this.props.manageId } userState={ userState } flag={ true } />);
    }
    return <p>测试页面</p>;
  }

  render() {
    return (
      <div className="card">
        <div className="card-header" onClick={ this.flashTabContent.bind(this) }>
          { this.props.title }
        </div>
        <div className="card-body dv-card-body" style={ { paddingLeft: 0, paddingRight: 0 } }>
          { this.getThData() }
        </div>
      </div>
      );
  }
}

export default ManageTabContent;
