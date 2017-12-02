import WordsInfo from "./bean/WordsInfo";
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

import ViewTitile from "./modules/ViewTitile.jsx";
import ViewWordsTable from "./modules/ViewWordsTable.jsx";
import store from "./redux/Store";

let words = new WordsInfo();

console.log(words.getJson());

ReactDOM.render(<ViewTitile />, document.getElementById("viewTitle"));

// ReactDOM.render(<ViewWordsTable />, document.getElementById("words-table"));
