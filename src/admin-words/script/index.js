import React from "react";
import getRouter from "./routers/index";
const ReactDOM = require("react-dom");

ReactDOM.render(getRouter(), document.getElementById("content"));
