import React from "react";
import ThContent from "../common/ThContent.jsx";
import Modal from "../login/Modal.jsx";
import utils from "../../utils.js";
import ReactTooltip from "react-tooltip";
import request from "../../sevice/request.js";
import UserDetail from "./UserDetail.jsx";
const colum = [
  {
    name: "index",
    title: "#"
  },
  {
    name: "userName",
    title: "用户账号"
  },
  {
    name: "organize",
    title: "所属组织"
  },
  {
    name: "phone",
    title: "联系电话"
  },
  {
    name: "state",
    title: "处理状态"
  },
  {
    name: "accepter",
    title: "审核人"
  },
  {
    name: "acceptDate",
    title: "处理时间"
  },
  {
    name: "operat",
    title: "操作"
  }
];


class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: {},
      userId: 0,
      data: [],
      isAddManager: false,
      openModal: false
    };
    this.getData(this.props.userState);
  }

  componentWillReceiveProps(oldValue) {
    if (oldValue != null) {
      let userState = oldValue.userState;
      this.getData(userState);
    }
  }
  getData(userState) {
    let me = this;
    $("#loading").modal("show");
    request.sendRequstNew(
      "/admin/getUserListByState",
      {
        userState: JSON.stringify(userState)
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
            item["isSelected"] = true;
            return item;
          });
          me.setState({
            data: resultData,
            isAddManager: false
          });
          $("#loading").modal("hide");
        }
      }
    );
  }

  onDoClickAction(me, item, flag, event) {
    if (flag == "delete") {
      this.deleteUser(item);
    } else if (flag == "addManager") {
      this.addManager(item);
      me.setState({
        userId: item.userId,
        currentItem: item,
        isAddManager: true,
        openModal: true
      });
    } else {
      me.setState({
        userId: item.userId,
        currentItem: item,
        isAddManager: false,
        openModal: true
      });
    }
  }

  modalAction(mine, event) {
    if (mine.state.isAddManager) {
      mine.setState({
        isAddManager: false,
        openModal: false
      });
    }
  }
  modalColseAction(mine, event) {}
  addManager(item) {
    let params = {
      userId: item.userId,
      manageId: this.props.manageId
    };
    this.sendRequest("/admin/addManager", params)
  }
  deleteUser(item) {
    let newData = utils.removeElementById(this.state.data, {
      name: "userId",
      value: item.userId
    });
    let params = {
      userId: item.userId,
      manager: this.props.manageId
    };
    this.sendRequest("/admin/deleteUser", params, newData);
  }

  sendRequest(url, params, newData) {
    let me = this;
    request.sendRequstNew(
      url, params, function(result) {
        if (result.code != "200") {
          alert(result.result);
        } else {
          if (newData != null) {
            alert("用户已删除");
            me.setState({
              data: newData
            });
          } else {
            alert("管理员已添加成功");
          }

        }
      }
    );
  }

  itemSelected(item, e) {
    let newData = this.state.data;
    newData.map(function(it, i) {
      if (item.userId == it.userId) {
        it.isSelected = !it.isSelected;
        return it;
      }
    });


    this.setState({
      data: newData
    });

  }

  getTrContent(item, index) {
    let state = "";
    let me = this;
    let isUsefull = false;
    if (item.state == 1) {
      state = "审核中";
    } else if (item.state == 2) {
      state = "审核通过";
      isUsefull = true;
    } else if (item.state == 3) {
      state = "审核拒绝";
    } else if (item.state == 0) {
      state = "未更新个人信息";
    } else if (item.state == 6) {
      state = "待审核";
    } else if (item.state == 5) {
      state = "可用";
    } else {
      state = item.state;
    }
    if (this.props.flag) {
      isUsefull = false;
    }
    return (
      <tr key={ index }>
        <td>
          <i className="fa fa-square-o dv-mr5" hidden={ !item.isSelected } onClick={ this.itemSelected.bind(this, item) }></i>
          <i className="fa fa-check-square-o dv-mr5" hidden={ item.isSelected } onClick={ this.itemSelected.bind(this, item) }></i>
          <span>{ index + 1 }</span>
        </td>
        <td style={ { maxWidth: 100 } }>
          <span className="dv-td-text-longer" data-tip={ item.email }> { item.email }  </span>
          <ReactTooltip />
        </td>
        <td style={ { maxWidth: 100 } }>
          <span className="dv-td-text-longer" data-tip={ item.organize }> { item.organize }</span>
          <ReactTooltip />
        </td>
        <td>
          { item.phone }
        </td>
        <td>
          { state }
        </td>
        <td>
          { item.accepter }
        </td>
        <td>
          { utils.formatDate(item.acceptDate) }
        </td>
        <td>
          <button type="button" className="col-auto btn btn-outline-success dv-mr10 btn-sm" data-toggle="modal" data-target={ "#modalElement" } onClick={ this.onDoClickAction.bind(this, me, item, "check") }>
            查看详情
          </button>
          <button type="button" className=" btn btn-outline-success dv-mr10  btn-sm" onClick={ this.onDoClickAction.bind(this, me, item, "delete") }>
            删除
          </button>
          <button type="button" className="btn btn-outline-success btn-sm" data-toggle="modal" data-target={ "#modalElement" } onClick={ this.onDoClickAction.bind(this, me, item, "addManager") } hidden={ !isUsefull }>
            升级为管理员
          </button>
        </td>
      </tr>
      );
  }

  render() {
    let mine = this;
    return (
      <div className={ this.props.className } hidden={ this.props.hidden }>
        <div className="table-responsive-sm" className="dv-tbody-scroll" style={ { overflowY: "auto", maxHeight: 500 } }>
          <table className="table table-sm table-bordered table-hover">
            <ThContent data={ colum } />
            <tbody>
              { this.state.data.map((item, index) => {
                  return this.getTrContent(item, index);
                }) }
            </tbody>
          </table>
        </div>
        <Modal modalEleId={ "modalElement" } modalTitle="用户信息" modalAction={ this.modalAction } modalColseAction={ this.modalColseAction } mine={ this }>
          <UserDetail user={ mine.state.currentItem } flag={ !this.props.flag } isAddManager={ this.state.isAddManager } manageId={ this.props.manageId } openModal={ this.state.openModal }
          />
        </Modal>
      </div>
      );
  }
}

export default UserList;
