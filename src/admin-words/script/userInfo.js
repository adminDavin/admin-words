import React from "react";
import ReactDOM from "react-dom";
import UserInfo from "./modules/user-info/UserInfo.jsx";
import utils from "./utils.js"; 

const getParams = utils.getRequestParams();

if (params.userId) {
  ReactDOM.render(
    <UserInfo userId={params.userId} loginName={params.loginName}/>, document.getElementById("content"));
}
