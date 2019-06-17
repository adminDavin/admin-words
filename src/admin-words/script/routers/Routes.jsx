import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from '../views/Dashboard';
import ProductList from '../views/ProductList';
import UserList from '../views/UserList';
import Account from '../views/Account';
import Settings from '../views/Settings';
import SignUp from '../views/SignUp';
import SignIn from '../views/SignIn';
import UnderDevelopment from '../views/UnderDevelopment';
import NotFound from '../views/NotFound';

// import SignInSide from '../views/SignInSide'

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        {
          /*<Redirect exact from="/" to="/login">
            </Redirect>
            <Route component={SignInSide} exact path="/login"></Route>
          */}
        
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
          component={UserList}
          exact
          path="/users"
        />
        <Route
          component={ProductList}
          exact
          path="/products"
        />
        <Route
          component={Account}
          exact
          path="/account"
        />
        <Route
          component={Settings}
          exact
          path="/settings"
        />
        <Route
          component={SignUp}
          exact
          path="/sign-up"
        />
        <Route
          component={SignIn}
          exact
          path="/sign-in"
        />
        <Route
          component={UnderDevelopment}
          exact
          path="/under-development"
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
