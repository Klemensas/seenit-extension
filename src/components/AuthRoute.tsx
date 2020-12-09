import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { useUserDataQuery } from '../graphql';

export default function AuthRoute({
  component: Component,
  ...rest
}: {
  component: React.FunctionComponent<unknown>;
} & RouteProps) {
  const { data } = useUserDataQuery();

  if (data?.userData) return <Route {...rest} component={Component} />;

  return <Redirect to="/login" />;
}
