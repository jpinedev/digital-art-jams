import authService from "../service/authService";
import { AppDispatch } from "../store";

export interface Login {
  username: string;
  password: string;
};

export interface LoginValidation {
  username: string[];
  password: string[];
  form: string[];
};

export const validateLoginUsername = (username: string): string[] => {
  let errors = [];
  if (username.length === 0) errors.push('Username must not be empty.');

  return errors;
};
export const validateLoginPassword = (password: string): string[] => {
  let errors = [];
  if (password.length === 0) errors.push('Password must not be empty.');

  return errors;
};

export const validateLogin = ({ username, password }: Login): LoginValidation => {
  return {
    username: validateLoginUsername(username),
    password: validateLoginPassword(password),
    form: []
  };
};

export const attemptLogin = (dispatch: AppDispatch, login: Login) =>
  new Promise((resolve, reject) => {
    const validation = validateLogin(login);

    if (validation.username.length > 0 || validation.password.length > 0) {
      reject(validation);
      return;
    }
    
    resolve(login);
  }).then(authService.login)
    .then(res => {
      if (res.status === 200) return res.json();
      return Promise.reject({ username: [], password: [], form: ['Incorrect username or password.'] });
    })
    .then(user => {
      dispatch({
        type: 'login',
        user
      });
    });

export const logout = (dispatch: AppDispatch) => 
  authService.logout()
    .then(() => dispatch({
      type: 'logout'
    }));

const loginAction = {
  attemptLogin,
  logout
};
export default loginAction;