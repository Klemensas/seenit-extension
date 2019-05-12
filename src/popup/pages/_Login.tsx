import * as React from 'react';

// function   React.useEffect(async () => {
//     const data = await fetch('localhost:9000/auth', {
//       method: 'post',
//       // body: JSON.stringify()
//     }).then((resp) => resp.json());
//     updateAuth(data);
//   });


// TS extends required as otherwise generic isn't recognized
interface RequestState<T> {
  loading: boolean;
  error: any;
  response: T;
}
type fetchFn = (url: string, body: object, callback?: Function) => Promise<void>;
const useApiRequest = <T extends {}>() => {
  const [requestState, dispatch] = React.useState({
    loading: false,
    error: null,
    response: null,
  });

  const fetchApi = async (url: string, payload: object, callback?: Function) => {
    dispatch({
      loading: true,
      error: null,
      response: null,
    });
    const data = await fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then((response) => response.json())
    .then((response: T) => callback ? callback(response) : response);

    dispatch({
      ...requestState,
      loading: false,
      response: data
    });
  }

  return [requestState, fetchApi] as [RequestState<T>, fetchFn];
};

const useAuthenticateRequest = () => {
  const [authState, fetchApi] = useApiRequest();

  return [
    authState,
    (payload: any) => fetchApi(
      'http://localhost:9000/auth',
      payload,

      (response) => new Promise((resolve) => chrome.storage.sync.set(response, () => resolve(response)))
    ),
  ] as [RequestState<any>, (data: any) => Promise<void>];
}

export default function Login() {
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });
  const [authState, fetchApi] = useAuthenticateRequest();

  return (
    <div>
      {/* <form onSubmit={fetchApi('http://localhost:9000/auth', form)}> */}
      {authState.loading ? <h1>LOADING...</h1> : ''}
      <form onSubmit={(e) => { e.preventDefault(); fetchApi(form); }}>
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
    </div>
  )
}
