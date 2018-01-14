import React from "react";
import ThContent from "../common/ThContent.jsx";
import Modal from "../login/Modal.jsx";
import utils from "../../utils.js";
import ReactTooltip from "react-tooltip";
import request from "../../sevice/request.js";
class ManageUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentItem: {}, userId: 0, update: "auditing", data: [] };
    setTimeout(() => {
      this.setState({ data: this.props.data });
    }, 500);
  }
  modalAction(mine, event) {}
  modalElement(mine) {
    let item = mine.state.currentItem;
    return (
      <div className="container">
        <div className="row">
          <dl className="col row">
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
            <dt className="col-3">{"审核人"}</dt>
            <dd className="col-9">{item.accepter}</dd>
            <dt className="col-3">{"审核时间"}</dt>
            <dd className="col-9">{utils.formatDate(item.acceptDate)}</dd>
          </dl>
          <div className="col card" hidden={!this.props.flag}>
            <div className="card-head text-center">权限列表</div>
            <div className="card-body">
              <div className="row">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>权限名称</th>
                      <th>权限状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>超级管理员</td>
                      <td>可用</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  taskDoAction(me, flag, userId) {}
  onDoClickAction(me, item, flag, event) {
    if (flag == "delete") {
      let newData = utils.removeElementById(me.state.data, {
        name: "userId",
        value: item.userId
      });
      request.sendRequstNew(
        "/admin/deleteUser",
        {
          userId: item.userId,
          manager: this.props.manageId
        },
        function(result) {
          if (result.code != "200") {
            alert(result.result);
          } else {
            alert("用户已删除");
            me.setState({ data: newData });
          }
        }
      );
    } else {
      me.setState({
        userId: item.userId,
        currentItem: item
      });
    }
  }
  getTrContent(item, index) {
    let state = "";
    let me = this;
    if (item.state == 1) {
      state = "审核中";
    } else if (item.state == 2) {
      state = "审核通过";
    } else if (item.state == 3) {
      state = "审核拒绝";
    } else if (item.state == 0) {
      state = "未更新个人信息";
    } else if (item.state == 6) {
      state = "待审核";
    } else {
      state = item.state;
    }
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            data-toggle="modal"
            data-target={"#modalElement"}
            onClick={this.onDoClickAction.bind(this, me, item, "check")}
          >
            查看详情
          </button>
          <button
            type="button"
            className="btn btn-outline-success btn-sm"
            onClick={this.onDoClickAction.bind(this, me, item, "delete")}
            hidden={this.props.flag}
          >
            删除
          </button>
        </td>
        <td style={{ maxWidth: 100 }}>
          <span className="dv-td-text-longer" data-tip={item.email}>
            {item.email}
          </span>
          <ReactTooltip />
        </td>
        <td style={{ maxWidth: 100 }}>
          <span className="dv-td-text-longer" data-tip={item.organize}>
            {item.organize}
          </span>
          <ReactTooltip />
        </td>
        <td>{item.phone}</td>
        <td>{state}</td>
        <td>{item.accepter}</td>
        <td>{utils.formatDate(item.acceptDate)}</td>
      </tr>
    );
  }
  render() {
    let mine = this;
    let width = this.props.flag ? 900 : null;
    return (
      <div
        className="table-responsive-sm"
        className="dv-tbody-scroll"
        style={{ overflowY: "auto", maxHeight: 500 }}
      >
        <table className="table table-sm table-bordered table-hover">
          <thead>
            <tr>
              {this.props.colum.map((pro, index) => {
                return <th key={index}>{pro.title}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item, index) => {
              return this.getTrContent(item, index);
            })}
          </tbody>
        </table>
        <Modal
          modalEleId={"modalElement"}
          modalTitle="查看用户信息"
          modalAction={this.modalAction}
          modalColseAction={this.modalAction}
          width={width}
          mine={this}
        >
          {this.modalElement(mine)}
        </Modal>
      </div>
    );
  }
}

export default ManageUser;
