import * as React from 'react';
import { Route, Switch } from 'react-router';

import Login from '../auth/Login';
import AuthRoute from '../components/AuthRoute';
import VideoEnd from '../watched/VideoEnd';
import CloseContent from './CloseContent';
import './Content.scss';
import { VideoData } from './renderService';

export const VideoContext = React.createContext<VideoData>(null);

export default function Content({ videoData }: { videoData: VideoData }) {
  return (
    <VideoContext.Provider value={videoData}>
      <CloseContent />
      <Switch>
        <Route exact path="/login" component={Login} />
        <AuthRoute exact path="/" component={VideoEnd} />
      </Switch>
    </VideoContext.Provider>
  );
}
