import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import loginAction, { Login, LoginValidation, validateLoginPassword, validateLoginUsername } from "../../actions/loginAction";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const LoginComponent = () => {
  const [form, setForm] = useState<Login>({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState<LoginValidation>({
    username: [],
    password: []
  });
  const loggedIn = useAppSelector(state => state.auth.registered);
  const dispatch = useAppDispatch();

  const updateUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      username: event.target.value
    });
    setLoginError({
      ...loginError,
      username: validateLoginUsername(event.target.value)
    });
  };
  const updatePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      password: event.target.value
    });
    setLoginError({
      ...loginError,
      password: validateLoginPassword(event.target.value)
    });
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginError.username.length !== 0 || loginError.password.length !== 0)
      return;

    attemptLogin();
  }
  const attemptLogin = () => 
    loginAction.attemptLogin(dispatch, form)
      .catch(setLoginError);

  return loggedIn ? <Redirect to="/profile" /> : (
    <div className="card offset-lg-3 col-lg-6 offset-md-2 col-md-8 offset-1 col-10">
      <div className="card-head p-lg-5 pb-lg-3 p-3 pb-3">
        <h3 className="mb-0">Login</h3>
      </div>
      <div className="card-body p-lg-5 pt-lg-0 p-3 pt-0">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" id="username"
              className={`form-control ${loginError.username.length > 0 ? 'is-invalid':0}`}
              autoComplete="username"
              value={form.username}
              onChange={updateUsername} />
            <div className="invalid-feedback">
              { loginError.username.map((error, index) => <div key={index}>{error}</div>) }
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password"
              className={`form-control ${loginError.password.length > 0 ? 'is-invalid':0}`}
              autoComplete="current-password"
              value={form.password}
              onChange={updatePassword} />
            <div className="invalid-feedback">
              { loginError.password.map((error, index) => <div key={index}>{error}</div>) }
            </div>
          </div>
          <div className="d-flex flex-column pt-3">
            <button className="btn btn-primary flex-grow-1 mb-2"
              type="submit"
              disabled={loginError.username.length > 0 || loginError.password.length > 0}>Login</button>
            <hr />
            <div className="text-muted text-center mb-2">Not a member yet?</div>
            <Link to={'/register'} className="btn btn-secondary flex-grow-1 ">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;