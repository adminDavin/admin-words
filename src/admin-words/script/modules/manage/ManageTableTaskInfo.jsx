import React from "react";
import ThContent from "../common/ThContent.jsx";
import Modal from "../login/Modal.jsx";
import utils from "../../utils.js";
import request from "../../sevice/request.js";

const changUserStatue = "/admin/updateUserStatus";
class ManageTableTaskInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      newData: [],
      currentItem: {},
      userId: 0,
      update: "finish"
    };
    setTimeout(() => {
      this.setState({
        data: this.props.data
      });
    }, 500);
  }
  modalAction(mine, event) {
    if (mine.state.update == "auditing") {
      let params = {
        accepter: this.props.manageId,
        userId: mine.state.userId,
        statusAction: "unaudit",
        massage: ""
      };
      request.sendRequstNew(changUserStatue, params, function(result) {
        if (result.code != "200") {
          alert(result.result);
        } else {
          me.setState({
            userId: userId,
            update: "finish"
          });
        }
      });
    }
  }
  modalElement(mine) {
    let item = mine.state.currentItem;
    return (
      <div className="container">
        <dl className="row">
          <dt className="col-3">{ "用户Id" }</dt>
          <dd className="col-9">
            { item.userId }
          </dd>
          <dt className="col-3">{ "姓名" }</dt>
          <dd className="col-9">
            { item.name }
          </dd>
          <dt className="col-3">{ "姓名拼写" }</dt>
          <dd className="col-9">
            { item.namePin }
          </dd>
          <dt className="col-3">{ "账号名" }</dt>
          <dd className="col-9">
            { item.email }
          </dd>
          <dt className="col-3">{ "注册邮箱" }</dt>
          <dd className="col-9">
            { item.email }
          </dd>
          <dt className="col-3">{ "所属组织" }</dt>
          <dd className="col-9">
            { item.organize }
          </dd>
          <dt className="col-3">{ "联系电话" }</dt>
          <dd className="col-9">
            { item.phone }
          </dd>
          <dt className="col-3">{ "所在地址" }</dt>
          <dd className="col-9">
            { item.address }
          </dd>
          <dt className="col-3">{ "申请时间" }</dt>
          <dd className="col-9">
            { utils.formatDate(item.applyDate) }
          </dd>
          <dt className="col-3">{ "申请备注" }</dt>
          <dd className="col-9">
            { item.remark }
          </dd>
        </dl>
        <div className="row">
          <button type="button" className="col btn btn-primary" data-dismiss="modal" onClick={ this.taskDoAction.bind(this, mine, "agree", item) }>
            { "审核通过" }
          </button>
          <button type="button" className="col btn btn-secondary" data-dismiss="modal" onClick={ this.taskDoAction.bind(this, mine, "reject", item) }>
            { "审核拒绝" }
          </button>
        </div>
        <form hidden={ true }>
          <div className="form-group">
            <h5>
                    <strong>{ "拒绝原因" }</strong>
                  </h5>
            <textarea className="form-control" rows="3" id="inputMultlineArea" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={ this.taskDoAction.bind(this, mine, "reject", item) }>
            确定
          </button>
        </form>
      </div>
      );
  }
  taskDoAction(me, flag, item) {
    let massage = "请联系管理员进行确认";
    let params = {
      accepter: me.props.manageId,
      userId: item.userId,
      statusAction: flag,
      massage: massage
    };
    item["name"] = "userId";
    item["value"] = item.userId;
    let newData = utils.removeElementById(me.state.data, item);
    $("#loading").modal("show");
    request.sendRequstNew(changUserStatue, params, function(result) {
      if (result.code != "200") {
        alert(result.result);
      } else {
        me.setState({
          userId: 0,
          update: "finish",
          data: newData
        });
        setTimeout(() => {
          $("#loading").modal("hide");
        }, 500);
      }
    });
  }
  onDoClickAction(item, event) {
    let me = this;
    let params = {
      accepter: this.props.manageId,
      userId: item.userId,
      statusAction: "audit",
      massage: ""
    };
    me.setState({
      userId: item.userId,
      update: params.statusAction,
      currentItem: item
    });
  }
  getTrContent(item, index) {
    let state = item.state == 0 ? "用户信息未更新" : "用户信息已更新";
    let stateStyle = item.state == 0 ? "alert alert-secondary" : "alert alert-success";
    return (
      <tr key={ index }>
        <td>
          { index + 1 }
        </td>
        <td>
          { "待审核用户" }
        </td>
        <td>
          { "注册申请" }
        </td>
        <td>
          { utils.formatDate(item.applyDate) }
        </td>
        <td className={ stateStyle }>
          { state }
        </td>
        <td>
          { item.email }
        </td>
        <td>
          <button type="button" className="btn btn-outline-success btn-sm" data-toggle="modal" data-target={ "#modalElement" } onClick={ this.onDoClickAction.bind(this, item) }>
            处理
          </button>
        </td>
      </tr>
      );
  }
  render() {
    let mine = this;
    return (
      <div className="container">
        <div className="table-responsive-sm" className="dv-tbody-scroll" style={ { overflowY: "auto", maxHeight: 500 } }>
          <table className="table table-sm table-bordered table-hover">
            <ThContent data={ this.props.colum } />
            <tbody>
              { this.state.data.map((item, index) => {
                  return this.getTrContent(item, index);
                }) }
            </tbody>
          </table>
          <Modal modalEleId={ "modalElement" } modalTitle="注册任务处理" modalAction={ this.modalAction } modalColseAction={ this.modalAction } mine={ this }>
            { this.modalElement(mine) }
          </Modal>
        </div>
      </div>
      );
  }
}

export default ManageTableTaskInfo;
