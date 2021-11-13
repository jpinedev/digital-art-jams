import { usersIds, usersMap } from "../reducers/mock-data/users";
import { AppDispatch } from "../store";

export interface Login {
  username: string;
  password: string;
};

export interface LoginValidation {
  username: string[];
  password: string[];
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
    password: validateLoginPassword(password)
  };
};

export const attemptLogin = (dispatch: AppDispatch, login: Login) => {

  // mock login
  return new Promise((resolve, reject) => {
    const validation = validateLogin(login);

    if (validation.username.length > 0 || validation.password.length > 0) {
      reject(validation);
      return;
    }
    
    setTimeout(() => {
      if (usersIds.findIndex(userId => userId === login.username) === -1)
        reject({ username: ['Incorrect username or password.'], password: [] });
      else resolve(usersMap[login.username]);
    }, 300);
  }).then(user => {
    dispatch({
      type: 'login',
      user
    });
  });
};

const loginAction = {
  attemptLogin
};
export default loginAction;