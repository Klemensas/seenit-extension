import * as React from 'react';
import { Switch } from 'react-router';
import { NavLink, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Navbar, Alignment, Button } from '@blueprintjs/core';

import '../styles/main.scss';
import './Popup.scss';

import { useSetIsLoggedInMutation } from '../graphql';
import Login from '../auth/Login';
import AuthRoute from '../components/AuthRoute';
import RecentWatched from './RecentWatched';
import Settings from './Settings';

export default function Popup() {
  const [setLoggedIn] = useSetIsLoggedInMutation({
    variables: { isLoggedIn: false },
  });

  return (
    <React.Fragment>
      <div className="navigation-container">
        <Navbar fixedToTop>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>SeenIt</Navbar.Heading>
            <Navbar.Divider />
            <NavLink to="/">
              <Button minimal>Add item</Button>
            </NavLink>
            <NavLink to="/settings">
              <Button minimal>Settings</Button>
            </NavLink>
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            <Navbar.Divider />
            <Button minimal icon="refresh" onClick={() => chrome.runtime.reload()} />
            <Button minimal icon="log-out" onClick={() => setLoggedIn()} />
          </Navbar.Group>
        </Navbar>
      </div>
      <div className="content-container">
        <Switch>
          <Route exact path="/login" component={Login} />
          <AuthRoute exact path="/" component={RecentWatched} />
          <AuthRoute exact path="/settings" component={Settings} />
        </Switch>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
}
