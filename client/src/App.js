import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Pages from './pages/Pages';
import LandingPage from './pages/LandingPage';
import GoogleRedirect from './pages/GoogleRedirect';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/auth/google/:redirect' component={GoogleRedirect} />
        <Route component={Pages} />
      </Switch>
    </BrowserRouter>
  );
}
