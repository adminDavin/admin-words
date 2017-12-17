import "../style/admin-words.scss";

import React from "react";
import ReactDOM from "react-dom";
import HeadLayer from "./modules/HeadLayer.jsx";
// import Manage from "./modules/Manage.jsx";
// import UserLogin from "./modules/UserLogin.jsx";
// import ModalTest from "./modules/ModalTest.jsx";

ReactDOM.render(<HeadLayer />, document.getElementById("header"));
// ReactDOM.render(<ModalTest />, document.getElementById("content"));

// ReactDOM.render(<UserLogin />, document.getElementById("content"));

// ReactDOM.render(
//   <Provider store={store}>
//     <Manage />
//   </Provider>,
//   document.getElementById("content")
// );
