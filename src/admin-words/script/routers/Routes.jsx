import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NotFound from '../views/NotFound';
import Dashboard from '../views/Dashboard';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
      <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        <Route
          component={Dashboard}
          exact
          path="/dashboard"
        />
        <Route
          component={NotFound}
          exact
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}
