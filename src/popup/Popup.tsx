import * as React from 'react';
import { Route, Link } from 'react-router-dom';

import './Popup.scss';
import Login from './pages/Login';
import Home from './pages/Home';

interface AppProps {}
interface AppState {}

export default class Popup extends React.Component<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);
  }

  componentDidMount() {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }

  render() {
    return (
      <div className="popupContainer">
        Hello, world! az?
        <button onClick={() => chrome.runtime.reload()}>Reload ext</button>
          {/* <Route path="/" exact component={Home}></Route> */}
          <Route path="/" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
      </div>
    )
  }
}
