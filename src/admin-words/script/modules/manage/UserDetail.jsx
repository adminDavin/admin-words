import React from "react";
import utils from "../../utils.js";
import RoleList from "./RoleList.jsx";
import request from "../../sevice/request.js";

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: []
    }
    if (this.props.openModal) {
      this.getManagerRoles(this.props.user.userId);
    }
  }

  getRoles(roles, mine) {
    mine.setRoles(roles);
  }
  componentWillReceiveProps(oldValue) {
    if (oldValue.openModal) {
      this.getManagerRoles(oldValue.user.userId);
    }

  }

  getManagerRoles(userId) {
    if (userId == null) {
      return;
    }
    let params = {
      userId: userId
    };
    let me = this;
    request.sendRequstNew("/admin/getManagerRoles", params,
      function(result) {
        if (result.code != "200") {
          alert(result.result);
        } else {
          let data = result.result.data;
          let resultData = data.map((item, index) => {
            item["isSelected"] = true;
            return item;
          });
          me.setState({
            roles: resultData
          });
        }
      });
  }

  setRoles(roles) {
    let selectedRoles = [];
    for (let i in roles) {
      if (roles[i].isSelected) {
        let flag = true;
        for (let j in selectedRoles) {
          if (roles[i].roleId == selectedRoles[j].roleId) {
            let flag = false;
          }
        }
        if (flag) {
          selectedRoles.push(roles[i]);
        }

      }
    }
    this.setState({
      roles: selectedRoles
    });
  }

  saveRolesRel() {
    let rolesId = [];
    let roles = this.state.roles;
    for (let i in roles) {
      rolesId.push(roles[i].roleId);
    }
    let params = {
      userId: this.props.user.userId,
      manageId: this.props.manageId,
      rolesId: JSON.stringify(rolesId)
    };
    this.sendRequest("/admin/setManageRole", params);
  }

  sendRequest(url, params) {
    let me = this;
    request.sendRequstNew(
      url, params, function(result) {
        if (result.code != "200") {
          alert(result.result);
        } else {
          alert("管理员角色设置成功");
        }
      }
    );
  }


  render() {
    let item = this.props.user;
    return (
      <div className="container">
        <div className="row">
          <div className="col-5">
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
              <dt className="col-3">{ "审核人" }</dt>
              <dd className="col-9">
                { item.accepter }
              </dd>
              <dt className="col-3">{ "审核时间" }</dt>
              <dd className="col-9">
                { utils.formatDate(item.acceptDate) }
              </dd>
            </dl>
          </div>
          <div className="col-7" hidden={ !this.props.flag }>
            <div className="card">
              <div className="card-header"><span style={ { marginRight: 50 } }>管理员所拥有的角色</span>
                <button type="button" className="btn btn-primary btn-sm" hidden={ this.state.oparatFlag } onClick={ this.saveRolesRel.bind(this) }>
                  <i className="fa fa-floppy-o dv-mr10" aria-hidden="true"></i>保存设置
                </button>
              </div>
              <div className="card-body">
                { this.state.roles.map((item, index) => {
                    return (<span key={ index } className="dv-mr10"><span className="badge badge-secondary dv-mr5">{ item.name }</span>
                            </span>
                    )
                  }) }
              </div>
            </div>
            <div className="card">
              <div className="card-header">角色列表</div>
              <div className="card-body pre-scrollable" style={ { maxHeight: 300 } }>
                <RoleList userId={ item.userId } hidden={ true } selectedRoles={ this.state.selectedRoles } manageId={ this.props.manageId } getRoles={ this.getRoles }
                  mine={ this } />
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}
;


export default UserDetail;