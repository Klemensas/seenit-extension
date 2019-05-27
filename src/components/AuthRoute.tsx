import * as React from 'react';
import { Redirect, Route } from 'react-router';

import { useIsUserLoggedInQuery } from '../graphql';

export default function AuthRoute({
  component: Component,
  ...rest
}: {
  component: React.FunctionComponent<unknown>;
}) {
  const {
    data: { isLoggedIn },
  } = useIsUserLoggedInQuery();
  return (
    <Route
      {...rest}
      render={() => (isLoggedIn ? <Component /> : <Redirect to="/login" />)}
    />
  );
}
