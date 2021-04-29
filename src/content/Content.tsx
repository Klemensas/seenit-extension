import * as React from 'react';
import { Route, Switch } from 'react-router';

import Login from '../auth/Login';
import VideoEnd from '../watched/VideoEnd';
import TrackResult from '../watched/TrackResult';
import { VideoData } from './renderService';

import './Content.scss';
import DialogLayout from './layouts/DialogLayout';
import NotificationLayout from './layouts/NotificationLayout';
import { getStorageUser } from '../main';
import { MeQuery } from '../graphql';

export const VideoContext = React.createContext<VideoData | null>(null);
export const UserContext = React.createContext<MeQuery['me'] | null>(null);

// TODO: assuming user will always be authenticated here 🤷‍♂️
const Content: React.FC<{ videoData: VideoData }> = ({ videoData }) => {
  const [user, setUser] = React.useState<MeQuery['me'] | null>(null);

  React.useEffect(() => {
    async function fetchUser() {
      const currentUser = await getStorageUser();
      setUser(currentUser);
    }

    fetchUser();
  }, [getStorageUser]);

  return (
    <UserContext.Provider value={user}>
      <VideoContext.Provider value={videoData}>
        <Switch>
          <Route exact path={['/login', '/edit-auto-tracked/:id']}>
            <DialogLayout>
              <Route exact path="/login" component={Login} />
            </DialogLayout>
          </Route>
          <Route path={['/', '/auto-tracked']}>
            <NotificationLayout>
              <Route exact path="/" component={VideoEnd} />
              <Route path="/auto-tracked" component={TrackResult} />
            </NotificationLayout>
          </Route>
        </Switch>
      </VideoContext.Provider>
    </UserContext.Provider>
  );
};

export default Content;
