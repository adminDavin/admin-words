import React from "react";
import ReactDOM from "react-dom";
import UserInfo from "./modules/user-info/UserInfo.jsx";

import routeInfo from "./config/routerConfig.js";
const params = routeInfo.getParamData();
if (params.userId) {
  ReactDOM.render(
    <UserInfo userId={params.userId} />,
    document.getElementById("userInfo")
  );
}

// ReactDOM.render(<ViewWordsTable />, document.getElementById("words-table"));
