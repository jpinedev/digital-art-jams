import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import registerAction, { RegisterValidation, validateRegisterPassword, validateRegisterUsername } from "../../actions/registerAction";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

interface RegisterFormValidation extends RegisterValidation {
  confirmPassword: string[];
  agree: string[];
}

const RegisterComponent = () => {
  const [form, setForm] = useState<RegisterForm>({
    username: '',
    password: '',
    confirmPassword: '',
    agree: false
  });
  const [registerError, setRegisterError] = useState<RegisterFormValidation>({
    username: [],
    password: [],
    confirmPassword: [],
    agree: []
  });
  const loggedIn = useAppSelector(state => state.authStatus);
  const dispatch = useAppDispatch();

  const updateUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      username: event.target.value
    });
    setRegisterError({
      ...registerError,
      username: validateRegisterUsername(event.target.value)
    });
  };
  const updatePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      password: event.target.value
    });
    setRegisterError({
      ...registerError,
      password: validateRegisterPassword(event.target.value)
    });
  }
  const validateConfirmPassword = (value: string) =>
    setRegisterError({
      ...registerError,
      confirmPassword: form.password === value ? []:['Passwords do not match.']
    });
  const updateConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      confirmPassword: event.target.value
    });
    validateConfirmPassword(event.target.value);
  }

  const validateAgree = (value: boolean) => 
    setRegisterError({
      ...registerError,
      agree: value ? []:['Must agree to the privacy policy to register.']
    });
  
  const updateAgree = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      agree: event.target.checked
    });
    validateAgree(event.target.checked);
  }

  const validateLocalForm = (confirm: string, agree: boolean) => {
    return {
      ...registerError,
      confirmPassword: form.password === confirm ? []:['Passwords do not match.'],
      agree: agree ? []:['Must agree to the privacy policy to register.']
    };
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const registerErrors = validateLocalForm(form.confirmPassword, form.agree);

    if (registerErrors.username.length !== 0 || registerErrors.password.length !== 0 || registerErrors.confirmPassword.length !== 0 || registerErrors.agree.length !== 0) {
      setRegisterError(registerErrors);
      return;
    }

    attemptRegister();
  }
  const attemptRegister = () => 
    registerAction.attemptRegister(dispatch, form)
      .catch(err => {
        setRegisterError({
          confirmPassword: [],
          ...err
        });
      });

  return loggedIn ? <Redirect to="/profile" /> : (
    <div className="card offset-lg-3 col-lg-6 offset-md-2 col-md-8 offset-1 col-10">
      <div className="card-head p-lg-5 pb-lg-3 p-3 pb-3">
        <h3 className="mb-0">Register</h3>
      </div>
      <div className="card-body p-lg-5 pt-lg-0 p-3 pt-0">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" id="username"
              className={`form-control ${registerError.username.length > 0 ? 'is-invalid':0}`}
              autoComplete="username"
              value={form.username}
              onChange={updateUsername} />
            <div className="invalid-feedback">
              { registerError.username.map((error, index) => <div key={index}>{error}</div>) }
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password"
              className={`form-control ${registerError.password.length > 0 ? 'is-invalid':0}`}
              autoComplete="new-password"
              value={form.password}
              onChange={updatePassword} />
            <div className="invalid-feedback">
              { registerError.password.map((error, index) => <div key={index}>{error}</div>) }
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" id="confirmPassword"
              className={`form-control ${registerError.confirmPassword?.length > 0 ? 'is-invalid':0}`}
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={updateConfirmPassword} />
            <div className="invalid-feedback">
              { registerError.confirmPassword?.map((error, index) => <div key={index}>{error}</div>) }
            </div>
          </div>
          <div className="mb-3 form-check">
            <label htmlFor="agree" className="form-check-label">I have read and agree to the following <Link to={'/privacy-policy'} target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.</label>
            <input type="checkbox" id="agree"
              className={`form-check-input ${registerError.agree?.length > 0 ? 'is-invalid':0}`}
              checked={form.agree}
              onChange={updateAgree} />
            <div className="invalid-feedback">
              { registerError.agree?.map((error, index) => <div key={index}>{error}</div>) }
            </div>
          </div>
          <div className="d-flex flex-column pt-3">
            <button className="btn btn-primary flex-grow-1 mb-2"
              type="submit"
              disabled={registerError.username.length > 0 || registerError.password.length > 0 || registerError.confirmPassword.length > 0 || registerError.agree.length > 0}>Register</button>
            <hr />
            <div className="text-muted text-center mb-2">Already have an account?</div>
            <Link to={'/login'} className="btn btn-secondary flex-grow-1 ">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterComponent;