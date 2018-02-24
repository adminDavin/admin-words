import React from "react";

import ThContent from "../common/ThContent.jsx";
import Modal from "../login/Modal.jsx";
import utils from "../../utils.js";
import ServiceInfo from "./ServiceInfo.jsx";
import request from "../../sevice/request.js";

const colum = [
  {
    name: "index",
    title: "#"
  },
  {
    name: "roleName",
    title: "角色名称"
  },
  {
    name: "roleDesc",
    title: "角色描述"
  },
  {
    name: "creator",
    title: "管理员编号"
  },
  {
    name: "createDate",
    title: "创建时间"
  },
  {
    name: "state",
    title: "角色状态"
  },
  {
    name: "operat",
    title: "操作"
  }
];


class RoleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: {},
      userId: 0,
      data: []
    };
    this.getData(this.props.userId);
  }

  componentWillReceiveProps(oldValue) {
    if (oldValue.flush != null) {
      let userId = oldValue.userId;
      this.getData(userId);
    }
    if (oldValue.userId == this.props.userId) {
      return;
    }
    if (oldValue != null) {
      let userId = oldValue.userId;
      this.getData(userId);
    }
  }

  getData(userId) {
    let me = this;
    request.sendRequstNew(
      "/admin/getRoleList",
      {
        userId: this.props.userId
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
            let selectedRoles = me.props.selectedRoles;
            item["isSelected"] = false;
            for (let i in selectedRoles) {
              if (selectedRoles[i].roleId == item.roleId) {
                item["isSelected"] = true;
              }
            }
            return item;
          });
          me.setState({
            data: resultData,
            userId: userId
          });
        }
      }
    );
  }

  modalAction(mine, event) {}

  modalElement(mine) {
    let item = mine.state.currentItem;
    let roleId = item.roleId;
    if (roleId == 1) {
      roleId = 0;
    }
    return (<ServiceInfo className="col-auto" roleId={ roleId } roleName={ mine.state.currentItem.name } manageId={ this.props.manageId } />);
  }

  onDoClickAction(item, event) {
    this.setState({
      currentItem: item
    });
  }

  itemSelected(item, e) {
    let newData = this.state.data;
    newData.map(function(it, i) {
      if (item.roleId == it.roleId) {
        it.isSelected = !it.isSelected;
        return it;
      }
    });
    this.setState({
      data: newData
    });
    if (this.props.getRoles != null) {
      this.props.getRoles(newData, this.props.mine);
    }
  }

  onDeleteRoleAction(item, event) {
    let me = this;
    let params = {
      manageId: this.props.manageId,
      roleId: item.roleId
    };
    request.sendRequstNew(
      "/admin/deleteRole", params,
      function(result) {
        if (result.code != "200") {
          alert(result.result);
        } else {
          alert("角色已删除");
          me.getData(me.state.userId);
        }
      }
    );
  }

  getTrContent(item, index) {
    let state = item.state == 0 ? "可用" : "不可用";
    let hidden = false;
    if (item.roleId == 1) {
      hidden = true;
    }
    if (this.props.hidden) {
      hidden = true;
    }

    return (
      <tr key={ index }>
        <td>
          <i className="fa fa-square-o dv-mr5" hidden={ item.isSelected } onClick={ this.itemSelected.bind(this, item) }></i>
          <i className="fa fa-check-square-o dv-mr5" hidden={ !item.isSelected } onClick={ this.itemSelected.bind(this, item) }></i>
          { index + 1 }
        </td>
        <td>
          { item.name }
        </td>
        <td>
          { item.desc }
        </td>
        <td>
          { item.userId }
        </td>
        <td>
          { utils.formatDate(item.createDate) }
        </td>
        <td>
          { state }
        </td>
        <td>
          <button type="button" className="btn btn-primary btn-sm dv-mr10" data-toggle="modal" data-target={ "#modalServiceElement" } onClick={ this.onDoClickAction.bind(this, item) }>
            查看服务
          </button>
          <button type="button" className="btn btn-outline-second btn-sm" hidden={ hidden } onClick={ this.onDeleteRoleAction.bind(this, item) }>
            删除角色
          </button>
        </td>
      </tr>
      );
  }

  render() {
    let mine = this;
    return (
      <div className="table-responsive-sm" className="dv-tbody-scroll" style={ { overflowY: "auto", maxHeight: 500 } }>
        <table className="table table-sm table-bordered table-hover">
          <ThContent data={ colum } />
          <tbody>
            { this.state.data.map((item, index) => {
                return this.getTrContent(item, index);
              }) }
          </tbody>
        </table>
        <Modal modalEleId={ "modalServiceElement" } modalTitle={ "服务列表: " + this.state.currentItem.name } modalAction={ this.modalAction } modalColseAction={ this.modalAction } mine={ this }>
          { this.modalElement(mine) }
        </Modal>
      </div>
      );
  }
}

export default RoleList;
