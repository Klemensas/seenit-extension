import * as React from 'react';
import { withRouter } from 'react-router';
import { FormGroup, InputGroup, Button, Intent } from '@blueprintjs/core';
import { FetchResult } from 'apollo-link';
import { DataProxy } from 'apollo-cache';

import { LoginMutation, RegisterMutation, useLoginMutation, useRegisterMutation } from '../graphql';
import { updateStorage } from '../common/storage';

export default withRouter(function Login({ history }) {
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    name: '',
  });
  const [isLogin, setLogin] = React.useState(true);
  const mutationParams = {
    variables: form,
    update: (cache: DataProxy, { data }: FetchResult<LoginMutation | RegisterMutation>) => {
      if (!data) return;

      const { token, user } = 'login' in data ? data.login : data.register;

      updateStorage({ token, user });
      cache.writeData({
        data: {
          isLoggedIn: true,
          userData: user,
        },
      });
      // TODO: consider moving this to completed since update might be called multiple times. Moved here since omplete isn't available on the 3rd party hook lib
    },
  };

  const targetMutation = isLogin ? useLoginMutation : useRegisterMutation;
  const [auth] = targetMutation(mutationParams);

  return (
    <React.Fragment>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          await auth();
          history.push('/');
        }}
      >
        {!isLogin && (
          <FormGroup label="Name" labelFor="name-input">
            <InputGroup
              id="name-input"
              large
              leftIcon="user"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: event.target.value })}
              placeholder="John Doe"
              value={form.name}
            />
          </FormGroup>
        )}
        <FormGroup label="Email" labelFor="email-input">
          <InputGroup
            id="email-input"
            large
            type="email"
            leftIcon="envelope"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: event.target.value })}
            placeholder="you@mail.com"
            value={form.email}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password-input">
          <InputGroup
            id="password-input"
            large
            type="password"
            leftIcon="lock"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, password: event.target.value })
            }
            placeholder="Your password"
            value={form.password}
          />
        </FormGroup>

        <div className="flex flex-between">
          <Button type="submit" intent={Intent.PRIMARY}>
            {isLogin ? 'Login' : 'Register'}
          </Button>
          <Button type="button" onClick={() => setLogin(!isLogin)}>
            {isLogin ? 'Need to create an account?' : 'Already have an account?'}
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
});
