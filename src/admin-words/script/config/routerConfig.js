import crypto from "./crypto.js";
import utils from '../utils.js';
const title = {
  adminManage: "管理员登录",
  regist: "用户注册",
  userMange: "用户管理",
  viewer: "切换到主页面",
  login: "登录"
};
 
const urlConfig = {
  viewer: {
    current: "/viewer.html",
    to: [{
      name: "userInfo",
      url: "/userInfo.html",
      button: title.userMange
    }],
    isUserAuth: true
  },
  userInfo: {
    current: "/userInfo.html",
    to: [{
      name: "viewer",
      url: "/viewer.html",
      button: title.viewer
    }],
    isUserAuth: true
  },
  login: {
    current: "/login.html",
    to: [{
        name: "viewer",
        url: "/viewer.html",
        button: title.viewer
      },
      {
        name: "userInfo",
        url: "/userInfo.html",
        button: title.userMange
      }
    ]
  },
  register: {
    current: "/register.html",
    to: [{
      name: "login",
      url: "/login.html",
      button: title.login
    }]
  },
  manager: {
    current: "/manager.html",
    to: [{
      name: "userInfo",
      url: "/userInfo.html",
      button: title.userMange
    }]
  }
};
 
const checkValidAndGetParams = function (config, params) {
  let urlGotoConfig = [];
  if (config.isUserAuth && !params.userId) {
    location.href = urlConfig.login.current;
  }
  config.to.map(function (item, index) {
    urlGotoConfig.push({
      name: item.button,
      url: item.url,
      params: params,
      show: ""
    });
  });
  return urlGotoConfig;
};

const routeInfo = {
  getRouteInfo: function () {
    let data = {
      params: utils.getRequestParams()
    };
    let url = window.location.pathname;

    let projectName = "/" + url.split("/")[1];
    switch (projectName) {
      case urlConfig.viewer.current:
        data["title"] = checkValidAndGetParams(urlConfig.viewer, data.params);
        return data;
      case urlConfig.userInfo.current:
        data["title"] = checkValidAndGetParams(urlConfig.userInfo, data.params);
        return data;
      case urlConfig.login.current:
        data["title"] = checkValidAndGetParams(urlConfig.login, data.params);
        return data;
      case urlConfig.manager.current:
        data["title"] = checkValidAndGetParams(urlConfig.manager, data.params);
        return data;
      default: 
        location.href = urlConfig.login.current;
    }
  },
  getParamData: utils.getRequestParams
};

export default routeInfo;