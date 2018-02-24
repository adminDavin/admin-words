import React from "react";

import ThContent from "../common/ThContent.jsx";
import Modal from "../login/Modal.jsx";
import utils from "../../utils.js";
import ServiceInfo from "./ServiceInfo.jsx";
import request from "../../sevice/request.js";
import RoleList from "./RoleList.jsx";

class ManageAuthInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: {},
      userId: 0,
      roleName: "",
      roleDesc: ""
    };
  }
  handleChange(vari, event) {
    let data = {};
    data[vari] = event.target.value;
    this.setState(data);
  }

  modalAddRoleAction(mine, event) {
    if (mine.state.roleName == "") {
      return;
    }
    request.sendRequstNew("/admin/roleinfo", {
      name: mine.state.roleName,
      desc: mine.state.roleDesc,
      manageId: mine.props.manageId
    }, function(result) {
      if (result.code != "200") {
        alert(result.result);
      } else {
        alert("角色添加成功");
        mine.setState({
          userId: 0
        });
      }
    });
  }

  modalAddRoleElement(mine) {
    return (<div>
              <form>
                <div className="form-group">
                  <label>角色名称</label>
                  <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="角色名称" value={ this.state.roleName } onChange={ this.handleChange.bind(this, "roleName") } />
                  <small id="emailHelp" className="form-text text-muted">必须填写</small>
                </div>
                <div className="form-group">
                  <label>角色描述</label>
                  <textarea className="form-control" rows="2" value={ this.state.roleDesc } onChange={ this.handleChange.bind(this, "roleDesc") }></textarea>
                </div>
              </form>
            </div>);
  }

  onDoClickAction(item, event) {}

  render() {
    let mine = this;
    return (
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-2">
            <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target={ "#modalAddRoleElement" } onClick={ this.onDoClickAction.bind(this, "") }>
              添加角色
            </button>
          </div>
        </div>
        <RoleList userId={ this.state.userId } manageId={ this.props.manageId } flush={ true } />
        <Modal modalEleId={ "modalAddRoleElement" } modalTitle={ "添加新角色" } modalAction={ this.modalAddRoleAction } modalColseAction={ this.modalAddRoleAction } mine={ this }>
          { this.modalAddRoleElement(mine) }
        </Modal>
      </div>
      );
  }
}

export default ManageAuthInfo;
