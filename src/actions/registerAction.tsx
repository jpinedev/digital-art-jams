import authService, { Login } from "../service/authService";
import { AppDispatch } from "../store";

export interface RegisterValidation {
  username: string[];
  password: string[];
};

export const validateRegisterUsername = (username: string): string[] => {
  let errors = [];
  if (username.length < 6 || username.length > 15) errors.push('Username must be between 6–15 characters.');
  if (!username.match(/^[a-zA-Z0-9]+$/)) errors.push('Username cannot contain any spaces or special characters.');

  return errors;
};
export const validateRegisterPassword = (password: string): string[] => {
  let errors = [];
  if (password.length < 8) errors.push('Password must be at least 8 characters.');
  if (!password.match(/[a-z]+/)) errors.push('Password must contain at least one lowercase letter.');
  if (!password.match(/[A-Z]+/)) errors.push('Password must contain at least one uppercase letter.');
  if (!password.match(/[0-9]+/)) errors.push('Password must contain at least one digit.');
  if (!password.match(/[^(\s\w\d)]+/)) errors.push('Password must contain at least one special character.');

  return errors;
};

export const validateRegister = ({ username, password }: Login): RegisterValidation => {
  return {
    username: validateRegisterUsername(username),
    password: validateRegisterPassword(password)
  };
};

export const attemptRegister = (dispatch: AppDispatch, login: Login) => {
  return new Promise((resolve, reject) => {
    const validation = validateRegister(login);

    if (validation.username.length > 0 || validation.password.length > 0) {
      reject(validation);
      return;
    }
    
    resolve(login);
  }).then(authService.register)
    .then(res => {
      if (res.ok) return res.json();
      else return Promise.reject({username: ['Username is already in use.'], password: []});
    })
    .then(user => {
      dispatch({
        type: 'login',
        user
      });
    });
};

const registerAction = {
  attemptRegister
};
export default registerAction;