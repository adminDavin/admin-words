import React from "react";
import utils from "../../utils.js";
import ThContent from "../common/ThContent.jsx";
import request from "../../sevice/request.js";
const columnList = [
  {
    name: "index",
    title: "#"
  },
  {
    name: "serviceName",
    title: "服务名称"
  },
  {
    name: "serviceDesc",
    title: "服务描述"
  },
  {
    name: "state",
    title: "服务状态"
  },
  {
    name: "createDate",
    title: "创建时间"
  }
];
class ServiceInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      oparatFlag: false,
      serviceList: []
    };
    let data = [];
    if (this.props.roleId != null) {
      this.getData(this.props.roleId);
    }

  }

  componentWillReceiveProps(oldValue) {
    if (oldValue != null) {
      let roleId = oldValue.roleId;
      this.getData(roleId);
    }
  }

  getData(roleId) {
    if (roleId == null) {
      return;
    }
    let me = this;
    request.sendRequstNew("/admin/getServerList", {
      roleId: roleId
    }, function(result) {
      if (result.code != "200") {
        alert(result.result);
        me.setState({
          data: [],
          oparatFlag: false,
          serviceList: []
        });
      } else {
        let resultData = result.result.data;
        request.sendRequstNew("/admin/getServerListByRole", {
          roleId: roleId
        }, function(results) {
          if (results.code != "200") {
            alert(result.results);
          } else {
            let resultsData = results.result.data;
            me.setState({
              data: resultData,
              serviceList: resultsData,
              oparatFlag: roleId == 0 ? true : false
            });
          }
        });
      }
    });

  }

  operateService(item, flag, e) {
    if (item.serviceId == null) {
      return;
    }
    let newServicelist = this.state.serviceList;
    for (let i in newServicelist) {
      if (item.serviceId == newServicelist[i].serviceId) {
        if (flag == "add") {
          return;
        } else {
          newServicelist.splice(i, 1);
        }
      }
    }
    if (flag == "add") {
      newServicelist.push(item);
    }
    this.setState({
      serviceList: newServicelist
    });
  }

  SaveServices() {
    if (this.props.roleId == 0 || this.props.roleId == null) {
      return;
    }
    let newServicelist = this.state.serviceList;
    let serviceIds = [];
    for (let i in newServicelist) {
      serviceIds.push(newServicelist[i].serviceId);
    }
    let me = this;
    let params = {
      roleId: me.props.roleId,
      manageId: me.props.manageId,
      serviceIds: JSON.stringify(serviceIds)
    };
    request.sendRequstNew("/admin/saveRoleRelService", params, function(result) {
      if (result.code != "200") {
        alert(result.result);
      } else {
        alert("保存成功");
      }
    });
  }

  render() {
    let mine = this;
    return (
      <div className="container">
        <div className="alert alert-light" hidden={ this.state.oparatFlag }>
          <div className="row">
            <h4 className="col-10"><i className="fa fa-group dv-mr5"></i><span>角色名称:</span>  <label>{ this.props.roleName }</label> </h4>
            <button type="button" className="col-auto btn btn-primary btn-sm" onClick={ this.SaveServices.bind(this) }>
              保存角色
            </button>
          </div>
          <div className="card">
            <div className="card-header">
              <i className="fa fa-meetup" aria-hidden="true"></i> 服务列表
            </div>
            <div className="card-body">
              { this.state.serviceList.map((item, index) => {
                  return (<span key={ index } className="dv-mr10"><span className="badge badge-secondary dv-mr5">{ item.name }</span>
                          <a href="#" className="badge badge-primary"><i className="fa fa-close" onClick={ this.operateService.bind(this, item, "delete") }></i></a>
                          </span>
                  )
                }) }
            </div>
          </div>
        </div>
        <div className="scroll_table_content" style={ { maxHeight: 300 } }>
          <table className="table">
            <ThContent data={ columnList } />
            <tbody>
              { this.state.data.map((item, index) => {
                  let state = item.state == 0 ? "可用" : "不可用";
                  return (
                    <tr key={ index }>
                      <td>
                        { index + 1 } </td>
                      <td>
                        { item.name } </td>
                      <td>
                        { item.desc } </td>
                      <td>
                        { state } </td>
                      <td>
                        { utils.formatDate(item.createDate) } </td>
                      <td>
                        <button type="button" className="btn btn-outline-second btn-sm" hidden={ this.state.oparatFlag } onClick={ this.operateService.bind(this, item, "add") }>
                          添加该服务
                        </button>
                      </td>
                    </tr>
                    );
                }) }
            </tbody>
          </table>
        </div>
      </div>
      );
  }
}

export default ServiceInfo;
