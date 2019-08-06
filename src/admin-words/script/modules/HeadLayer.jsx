import React from "react";
import logo from "../../style/logo.png";

import routeInfo from "../config/routerConfig.js";
import utils from "../utils";
import request from './../sevice/request';

class TrContent extends React.Component {
  render() {
    var item = this.props.data;
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.sale}</td>
      </tr>
    );
  }
}
export default class HeadLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { route: routeInfo.getRouteInfo(), exitHide: false, isEnabled: false };
  }
  text = {
    left: "words-admin",
    search: "搜索",
    baidu: "百度"
  };
  exitAction() {
    location.href = "/login.html";
  }
  componentDidMount() {
    let me = this;
    let route = me.state.route;
    console.log(route.params);
    let url = window.location.pathname;

    let projectName = "/" + url.split("/")[1];
    if (projectName === "/login.html") {
      me.setState({ exitHide: true });
    }
    if ('userId' in route.params) {
      request.sendRequstNew("/admin/getUserListByUserId", {
        userId: route.params.userId
      }, function(result) {
        if (result.code != "200") {
          alert(result.result);
        } else {
           let userInfo = result.result.data;
           if (0 == userInfo.state) {
            me.setState({ isEnabled: true });
           }
        }
      });
    }
  }
  getHeaderInfo() {
    let me = this;
    let route = me.state.route;
    console.log(me.state);
    return (
      <div className="row justify-content-end">
        {route.title.map(function (pro, index) {
          return (
            <button
              type="button"
              key={"button" + index}
              className="col-auto btn btn-outline-secondary dv-m5"
              style={{ marginLeft: 5 }}
              onClick={me.managelogin.bind(me, pro.url, pro.params)}
              disabled={me.state.isEnabled}
            >
              {pro.name}
            </button>
          );
        })}
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={this.exitAction}
          hidden={this.state.exitHide}
        >
          退出
        </button>
      </div>
    );
  }
  managelogin(url, params) {
    location.href = url + "?" + utils.parseParam(params);
  }
  search() { }
  render() {
    return (
      <div className="container-fluid row dv-header">
        <div className="row col-8">
          <div className="col-auto align-self-center">
            <img className="dv-logo" src={logo} alt="" style={{ backgroundColor: "#f5f0f0" }} />
          </div>
          <div className="col-3 dv-header-text align-self-center">{this.text.left}</div>
        </div>
        <div className="col-4">{this.getHeaderInfo()}</div>
      </div>
    );
  }
}
