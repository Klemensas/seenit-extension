import * as React from 'react';
import { Route, Redirect } from 'react-router';

import { useIsUserLoggedInQuery } from '../graphql';

export default function AuthRoute({ component: Component, ...rest }) {
  const { data: { isLoggedIn } } = useIsUserLoggedInQuery();
  return (
    <Route
      {...rest}
      render={() => isLoggedIn ? <Component /> : <Redirect to="/login" />}
    />
  );
}
