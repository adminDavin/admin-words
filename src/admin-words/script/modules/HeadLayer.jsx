import React from "react";
import logo from "../../style/logo.jpg";

import routeInfo from "../config/routerConfig.js";
import utils from "../utils";

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
    this.state = { route: routeInfo.getRouteInfo(), exitHide: false };
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

    let url = window.location.pathname;

    let projectName = "/" + url.split("/")[1];
    if (projectName === "/login.html") {
      me.setState({ exitHide: true });
    }
  }
  getHeaderInfo() {
    let me = this;
    let route = me.state.route;

    return (
      <div className="row">
        {route.title.map(function(pro, index) {
          return (
            <button
              type="button"
              key={"button" + index}
              className="btn btn-outline-secondary dv-mr5"
              onClick={me.managelogin.bind(me, pro.url, pro.params)}
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
  search() {}
  render() {
    return (
      <div className="container-fluid row dv-header">
        <div className="row col-9 justify-content-center">
          <img className="dv-logo col-md-1" src={logo} alt="" />
          <div className="col-md-2">{this.text.left}</div>
          <div className="col-md-5">
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon1">
                <a
                  href="http://www.baidu.com/"
                  onClick={this.search.bind(this)}
                />
                {this.text.baidu}
              </span>
              <input
                type="text"
                className="form-control"
                placeholder={this.text.search}
                aria-label="search"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
        <div className="col-3">{this.getHeaderInfo()}</div>
      </div>
    );
  }
}
