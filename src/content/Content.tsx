import * as React from 'react';
import { Switch, Route } from 'react-router';

import './Content.scss';
import { VideoData } from './renderService';
import AuthRoute from '../components/AuthRoute';
import VideoEnd from '../watched/VideoEnd';
import Login from '../auth/Login';
import CloseContent from './CloseContent';

export const VideoContext = React.createContext<VideoData>(null);

export default function Content({ videoData }: { videoData: VideoData }) {
  return (
    <VideoContext.Provider value={videoData}>
      <CloseContent />
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <AuthRoute exact path="/" component={VideoEnd} />
      </Switch>
    </VideoContext.Provider>
  )
}
