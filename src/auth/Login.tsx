import * as React from 'react';
import { withRouter } from 'react-router';

import { useLoginMutation, useRegisterMutation } from '../graphql';
import { updateStorage } from '../browserService';

export default withRouter(function Login({ history }) {
  // TODO: remove placeholder credentials
  const [form, setForm] = React.useState({
    email: 'user-1@demo.com',
    password: 'test',
    name: '',
  });
  const [isLogin, setLogin] = React.useState(true);
  const mutationParams = {
    variables: form,
    update: (cache, { data }) => {
      const { token, user } = data.login ? data.login : data.register;
      updateStorage({ token, user });
      cache.writeData({
        data: {
          isLoggedIn: true,
          userData: user,
        },
      });
      // TODO: consider moving this to completed since update might be called multiple times. Moved here since omplete isn't available on the 3rd party hook lib
      history.push('/');
    },
  };
  let auth;
  if (isLogin) {
    auth = useLoginMutation(mutationParams);
  } else {
    auth = useRegisterMutation(mutationParams);
  }

  return (
    <React.Fragment>
      <form
        onSubmit={e => {
          e.preventDefault();
          auth();
        }}
      >
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            required
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          required
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          required
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      <div>
        <button type="button" onClick={() => setLogin(!isLogin)}>
          {isLogin ? 'Need to create an account?' : 'Already have an account?'}
        </button>
      </div>
    </React.Fragment>
  );
});
