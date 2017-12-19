import React from "react";
import ReactDOM from "react-dom";
import HeadLayer from "./modules/HeadLayer.jsx";
import "../style/admin-words.scss";
import {
  BrowserRouter,
  Route
} from "react-router-dom";

// import Manage from "./modules/Manage.jsx";
// import UserLogin from "./modules/UserLogin.jsx";
// import ModalTest from "./modules/ModalTest.jsx";
// export default class Home extends React.Component {
//   render() {
//     return ( <
//       div >
//       <
//       h1 > this is the home page < /h1> <
//       div color = "red" >
//       <
//       a href = "./viewer.html" > page1 < /a> <
//       /div> <
//       div color = "green" >
//       <
//       a href = "./userInfo.html" > page2 < /a> <
//       /div> <
//       /div>
//     );
//   }
// }

// ReactDOM.render(
//   <BrowserRouter>
//     <Route path="/" component={Home} />
//   </BrowserRouter>,
//   document.getElementById("header")
// );

// ReactDOM.render(<Home />, document.getElementById("header"));

ReactDOM.render( < HeadLayer / > , document.getElementById("header"));
// ReactDOM.render(<ModalTest />, document.getElementById("content"));

// ReactDOM.render(<UserLogin />, document.getElementById("content"));

// ReactDOM.render(
//   <Provider store={store}>
//     <Manage />
//   </Provider>,
//   document.getElementById("content")
// );