import React from "react";
import ReactDOM from "react-dom";
import ManageUserInfo from "./modules/manage/ManageUserInfo.jsx";
import routeInfo from "./config/routerConfig.js";

const params = routeInfo.getParamData();
if (params.userId) {
  ReactDOM.render(<ManageUserInfo userId={params.userId} loginName={params.loginName}/>, document.getElementById("mainContent"));
}