import React from "react";
import ReactDOM from "react-dom";
import getRouter from "./routers/index";

ReactDOM.render(getRouter(), document.getElementById("content"));
