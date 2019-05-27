import * as React from 'react';
import { Switch } from 'react-router';
import { Link, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from '../auth/Login';
import AuthRoute from '../components/AuthRoute';
import { useSetIsLoggedInMutation } from '../graphql';
import { settings } from '../main';
import '../styles/main.scss';
import Watched from '../watched/Watched';
import './Popup.scss';
import RecentWatched from './RecentWatched';

export default function Popup() {
  const setLoggedIn = useSetIsLoggedInMutation({
    variables: { isLoggedIn: false },
  });

  return (
    <div className="popupContainer">
      <div>
        <Link to="/">Add item</Link>
        <Link to="/watched">Watched</Link>
      </div>
      <button type="button" onClick={() => setLoggedIn()}>
        LOGOUT
      </button>
      <button type="button" onClick={() => chrome.runtime.reload()}>
        Reload ext
      </button>
      <button
        type="button"
        onClick={() =>
          chrome.storage.sync.set({
            settings: { ...settings, debug: !settings.debug },
          })
        }
      >
        Toggle debug ({settings.debug ? 'on' : 'off'})
      </button>
      <button
        type="button"
        onClick={() =>
          chrome.storage.sync.set({
            settings: { ...settings, popup: !settings.popup },
          })
        }
      >
        Toggle video popup ({settings.popup ? 'on' : 'off'})
      </button>

      <Switch>
        <Route exact path="/login" component={Login} />
        <AuthRoute exact path="/" component={RecentWatched} />
        <AuthRoute exact path="/watched" component={Watched} />
      </Switch>
      <ToastContainer />
    </div>
  );
}
