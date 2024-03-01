import { useState } from 'react';
import TextInput from '../TextInput';
import useLogin from './useLogin';

const LoginForm = () => {
  const [login, error, status] = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    login({ username, password });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        gap: '16px',
      }}
    >
      <TextInput
        id="username"
        label="Username"
        value={username}
        onChange={setUsername}
      />
      <TextInput
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {status && <p>{status.message}</p>}
      <button>Login</button>
    </form>
  );
};

export default LoginForm;