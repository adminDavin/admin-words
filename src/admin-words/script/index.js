import React from 'react';
import ReactDOM from 'react-dom';
import Application from './routers/index';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "./../style/admin-words.scss";
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(<Router><Application /></Router>, document.getElementById('root'));
