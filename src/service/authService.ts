const AUTH_URL = 'http://localhost:5000/api/auth';

export type Login = { username: string, password: string };

const login = ({username, password}: any) => 
  fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({username, password}),
    headers: { 'content-type': 'application/json' }
  });

const register = ({username, password}: any) =>
  fetch(`${AUTH_URL}/register`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({username, password}),
    headers: { 'content-type': 'application/json' }
  });

const auth = () =>
  fetch(AUTH_URL, {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' }
  }).then(res => res.json())
    .catch(() => {});

const logout = () => 
  fetch(`${AUTH_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' }
  });

const authService = {
  login,
  register,
  auth,
  logout
};
export default authService;