import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';  
import { ThemeProvider } from '@material-ui/styles';

// Theme
import theme from 'common/theme';

// Styles
import 'react-perfect-scrollbar/dist/css/styles.css';

// Routes
import Routes from './Routes';

// Browser history
const browserHistory = createBrowserHistory();

class Application extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
      );
  }
}
export default Application;