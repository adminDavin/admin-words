import React from "react";

import ThContent from "../common/ThContent.jsx";
import Modal from "../login/Modal.jsx";
import utils from "../../utils.js";

class ManageAuthInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentItem: {}, userId: 0, update: "auditing" };
  }
  modalAction(mine, event) {
    if (mine.state.update == "auditing") {
      let params = {
        accepter: this.props.manageId,
        userId: mine.state.userId,
        action: "unaudit",
        massage: ""
      };
      console.log(params);
    }
    mine.setState({ userId: mine.state.userId, update: "finish" });
    console.log(mine);
  }
  modalElement(mine) {
    let item = mine.state.currentItem;
    return (
      <div className="container">
        <dl className="row">
          <dt className="col-3">{"用户Id"}</dt>
          <dd className="col-9">{item.userId}</dd>
          <dt className="col-3">{"姓名"}</dt>
          <dd className="col-9">{item.name}</dd>
          <dt className="col-3">{"姓名拼写"}</dt>
          <dd className="col-9">{item.namePin}</dd>
          <dt className="col-3">{"账号名"}</dt>
          <dd className="col-9">{item.email}</dd>
          <dt className="col-3">{"注册邮箱"}</dt>
          <dd className="col-9">{item.email}</dd>
          <dt className="col-3">{"所属组织"}</dt>
          <dd className="col-9">{item.organize}</dd>
          <dt className="col-3">{"联系电话"}</dt>
          <dd className="col-9">{item.phone}</dd>
          <dt className="col-3">{"所在地址"}</dt>
          <dd className="col-9">{item.address}</dd>
          <dt className="col-3">{"申请时间"}</dt>
          <dd className="col-9">{utils.formatDate(item.applyDate)}</dd>
          <dt className="col-3">{"申请备注"}</dt>
          <dd className="col-9">{item.remark}</dd>
        </dl>
        <div className="row">
          <button
            type="button"
            className="col btn btn-primary"
            onClick={this.taskDoAction.bind(this, mine, "agree", item.userId)}
          >
            {"审核通过"}
          </button>
          <button
            type="button"
            className="col btn btn-secondary"
            onClick={this.taskDoAction.bind(this, mine, "reject", item.userId)}
          >
            {"审核拒绝"}
          </button>
        </div>
        <form hidden={true}>
          <div className="form-group">
            <h5>
              <strong>{"拒绝原因"}</strong>
            </h5>
            <textarea
              className="form-control"
              rows="3"
              id="inputMultlineArea"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.taskDoAction.bind(this, mine, "reject", item.userId)}
          >
            确定
          </button>
        </form>
      </div>
    );
  }
  modalCreateRoleElement(mine) {
    return <div className="row" />;
  }
  taskDoAction(me, flag, userId) {
    // if (flag == "prerReject") {
    //   me.setState({ eleHidden: true });
    // }
    // if (flag == "reject") {
    //   console.log($("#inputMultlineArea"));
    // }
    let massage = "请联系管理员进行确认";
    let params = {
      accepter: me.props.manageId,
      userId: userId,
      action: flag,
      massage: massage
    };
    console.log(params);
    me.setState({ userId: userId, update: "finish" });
  }
  onDoClickAction(item, event) {
    let params = {
      accepter: this.props.manageId,
      userId: item.userId,
      action: "auditing",
      massage: ""
    };
    console.log(params);
    this.setState({
      currentItem: item,
      eleHidden: true,
      userId: item.userId,
      update: "auditing"
    });
  }

  getTrContent(item, index) {
    let state = item.state == 0 ? "可用" : "不可用";
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.desc}</td>
        <td>{item.userId}</td>
        <td>{utils.formatDate(item.createDate)}</td>
        <td>{state}</td>
        <td>{item.service}</td>
        <td>
          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            hidden
          >
            删除
          </button>
          <button
            type="button"
            className="btn btn-outline-second btn-sm"
            data-toggle="modal"
            data-target={"#modalElement"}
            onClick={this.onDoClickAction.bind(this, item)}
          >
            查看服务
          </button>
        </td>
      </tr>
    );
  }

  render() {
    let mine = this;
    return (
      <div
        className="table-responsive-sm"
        className="dv-tbody-scroll"
        style={{ overflowY: "auto", maxHeight: 500 }}
      >
        <div className="row" hidden>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-outline-success btn-sm"
              data-toggle="modal"
              data-target={"#modalCreateRoleElement"}
              onClick={this.onDoClickAction.bind(this, "")}
            >
              创建角色
            </button>
            <Modal
              modalEleId={"modalCreateRoleElement"}
              modalTitle="注册任务处理"
              modalAction={this.modalAction}
              modalColseAction={this.modalAction}
              mine={this}
            >
              {this.modalCreateRoleElement(mine)}
            </Modal>
          </div>
        </div>
        <table className="table table-sm table-bordered table-hover">
          <ThContent data={this.props.colum} />
          <tbody>
            {this.props.data.map((item, index) => {
              return this.getTrContent(item, index);
            })}
          </tbody>
        </table>
        <Modal
          modalEleId={"modalElement"}
          modalTitle="注册任务处理"
          modalAction={this.modalAction}
          modalColseAction={this.modalAction}
          mine={this}
        >
          {this.modalElement(mine)}
        </Modal>
      </div>
    );
  }
}

export default ManageAuthInfo;
