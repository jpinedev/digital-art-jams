import User from "../model/user/user";

const USERS_URL = 'http://localhost:5000/api/users';

const getUser = (username: string) =>
  fetch(`${USERS_URL}/${username}`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'content-type': 'application/json' }
  }).then(res => {
    if (res.status >= 400) throw new Error("Bad response from server");
    return res.json();
  });

const getAdmins = () =>
  fetch(`${USERS_URL}/admins`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'content-type': 'application/json' }
  }).then(res => {
    if (res.status >= 400) throw new Error("Bad response from server");
    return res.json();
  });

const promoteToAdmin = (user: User) =>
  fetch(`${USERS_URL}/admins/${user._id}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'content-type': 'application/json' }
  }).then(res => {
    if (res.status >= 400) throw new Error("Bad response from server");
  });

const updateUser = (user: User) =>
  fetch(`${USERS_URL}/${user._id}`, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(user),
    headers: { 'content-type': 'application/json' }
  });

const usersService = {
  getUser,
  getAdmins,
  promoteToAdmin,
  updateUser
};
export default usersService;