import * as React from 'react';
import { Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';

import '../styles/main.scss';
import './Popup.scss';
import Login from '../auth/Login';
import RecentWatched from './RecentWatched';
import AuthRoute from '../components/AuthRoute';
import { useSetIsLoggedInMutation } from '../graphql';
import Watched from '../watched/Watched';
import { settings } from '../main';

export default function Popup() {
  const setLoggedIn = useSetIsLoggedInMutation({ variables: { isLoggedIn: false } });

  return (
    <div className="popupContainer">
      <div>
        <Link to={'/'}>Add item</Link>
        <Link to={'/watched'}>Watched</Link>
      </div>
      <button onClick={() => setLoggedIn()}>LOGOUT</button>
      <button onClick={() => chrome.runtime.reload()}>Reload ext</button>
      <button onClick={() => chrome.storage.sync.set({ settings: { ...settings, debug: !settings.debug } })}>Toggle debug ({settings.debug ? 'on' : 'off' })</button>
      <button onClick={() => chrome.storage.sync.set({ settings: { ...settings, popup: !settings.popup } })}>Toggle video popup ({settings.popup ? 'on' : 'off' })</button>

      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <AuthRoute exact path="/" component={RecentWatched} />
        <AuthRoute exact path="/watched" component={Watched} />
      </Switch>
      <ToastContainer />
    </div>
  )
}
