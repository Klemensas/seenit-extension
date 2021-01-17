import * as React from 'react';
import { Route, Switch } from 'react-router';

import Login from '../auth/Login';
import AuthRoute from '../components/AuthRoute';
import VideoEnd from '../watched/VideoEnd';
import EditAutoTracked from '../watched/EditAutoTracked';
import TrackResult from '../watched/TrackResult';
import { VideoData } from './renderService';

import './Content.scss';
import DialogLayout from './layouts/DialogLayout';
import NotificationLayout from './layouts/NotificationLayout';

export const VideoContext = React.createContext<VideoData | null>(null);

const Content: React.FC<{ videoData: VideoData }> = ({ videoData }) => {
  return (
    <VideoContext.Provider value={videoData}>
      <Switch>
        <Route exact path={['/login', '/edit-auto-tracked/:id', '/']}>
          <DialogLayout>
            <Route exact path="/login" component={Login} />
            <AuthRoute exact path="/edit-auto-tracked/:id" component={EditAutoTracked} />
            <AuthRoute exact path="/" component={VideoEnd} />
          </DialogLayout>
        </Route>
        <Route exact path={['/tracked']}>
          <NotificationLayout>
            <AuthRoute exact path="/tracked" component={TrackResult} />
          </NotificationLayout>
        </Route>
      </Switch>
    </VideoContext.Provider>
  );
};

export default Content;
