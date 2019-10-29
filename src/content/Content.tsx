import * as React from 'react';
import { Route, Switch } from 'react-router';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';

import Login from '../auth/Login';
import AuthRoute from '../components/AuthRoute';
import VideoEnd from '../watched/VideoEnd';
import CloseContent from './CloseContent';
import './Content.scss';
import { VideoData } from './renderService';

export const VideoContext = React.createContext<VideoData>(null);

const Content: React.FC<{ videoData: VideoData }> = ({ videoData }) => {
  return (
    <VideoContext.Provider value={videoData}>
      <CloseContent />
      <Switch>
        <Route exact path="/login" component={Login} />
        <AuthRoute exact path="/" component={VideoEnd} />
      </Switch>
    </VideoContext.Provider>
  );
};

export default Content;
