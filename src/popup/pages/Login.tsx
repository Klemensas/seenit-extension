import * as React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';

const loginMutation = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
}
`;

const registerMutation = gql`
mutation register($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    token
    user {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
}
`;

function Login({ history }) {
  const [form, setForm] = React.useState({
    email: '',
    password: '',
    name: '',
  });
  const [isLogin, setLogin] = React.useState(false);
  // console.log('ay', email);
  return (
    <Mutation
      mutation={isLogin ? loginMutation : registerMutation}
      variables={form}
      onCompleted={() => history.push('/home')}
    >
      {callMutation => (
        // {/* <form onSubmit={fetchApi('http://localhost:9000/auth', form)}> */}
        // {authState.loading ? <h1>LOADING...</h1> : ''}
        <React.Fragment>
          <form onSubmit={(e) => { e.preventDefault(); callMutation()}}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                required
                onChange={e => setForm({ ...form, name: e.target.value})}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              required
              onChange={e => setForm({ ...form, email: e.target.value})}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              required
              onChange={e => setForm({ ...form, password: e.target.value})}
            />
            <button type="submit">Login</button>
          </form>
          <div>
            <a
              href="#"
              onClick={() => setLogin(!isLogin)}
            >{isLogin ? 'Need to create an account?' : 'Already have an account?'}</a>
          </div>
        </React.Fragment>
      )}
    </Mutation>
  )
}

export default withRouter(Login)
