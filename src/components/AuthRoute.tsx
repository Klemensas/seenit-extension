import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { IsUserLoggedInComponent } from '../graphql';
import { apolloClient } from '../apollo';

export default function AuthRoute({
  component: Component,
  ...rest
}: {
  component: React.FunctionComponent<unknown>;
} & RouteProps) {
  return (
    <IsUserLoggedInComponent client={apolloClient}>
      {({ data }) => {
        return <Route {...rest} render={() => (data.isLoggedIn ? <Component /> : <Redirect to="/login" />)} />;
      }}
    </IsUserLoggedInComponent>
  )
}
