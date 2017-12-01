import "../style/admin-words.scss"; 

import React from "react";
import ReactDOM from "react-dom";
import {
  Router,
  Route,
  Redirect,
  IndexRoute,
  browserHistory,
  hashHistory
} from "react-router";
import { Provider } from "react-redux";

import HeadLayer from "./modules/HeadLayer.jsx";
import Manage from "./modules/Manage.jsx";
import UserLogin from "./modules/UserLogin.jsx";

import store from "./redux/Store";

ReactDOM.render(<HeadLayer />, document.getElementById("header"));
// ReactDOM.render(<UserLogin />, document.getElementById("content"));

// ReactDOM.render(
//   <Provider store={store}>
//     <Manage />
//   </Provider>,
//   document.getElementById("content")
// );
