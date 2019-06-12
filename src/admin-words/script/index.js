import ReactDOM from 'react-dom';
import getRouter from './routers/index';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/scss/mdb.scss";


ReactDOM.render(getRouter(), document.getElementById('content'));
