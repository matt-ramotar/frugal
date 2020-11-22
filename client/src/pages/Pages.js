import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';

export default function Pages() {
  return (
    <Switch>
      <Route exact path='/dashboard' component={Dashboard} />
    </Switch>
  );
}
