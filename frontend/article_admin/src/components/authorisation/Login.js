import React, { useState } from 'react';
import AuthService from './AuthService';
import FailedAuth from './FailedAuth';

const Login = () => {
  const [userCreds, setuserCreds] = useState({
    username: '',
    password: ''
  });
  const [loginFailed, setLoginFailed] = useState(false)

  const { username, password } = userCreds;

  const handleChange = (e) => {
    setuserCreds({ ...userCreds, [e.target.name]: e.target.value });
  };

  const handleFailedAuth = () => {
    console.log("failed")
    setLoginFailed(true)
    return(
      <FailedAuth/>
    )
  }
  const authService = AuthService(handleFailedAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = userCreds;
    await authService.login(username, password);
  };

  function failedLoginRender(){
    if (loginFailed){
      return (
        <FailedAuth/>
      )
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {failedLoginRender()}
    </div>
  );
};

export default Login;