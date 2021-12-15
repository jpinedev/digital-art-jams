import { AnyAction } from "@reduxjs/toolkit";
import { UnregisteredUser } from "../model/user/user";

const authUser = (state = UnregisteredUser, action: AnyAction) => {
  switch (action.type) {
    case 'login':
      return action.user;
    case 'update-user':
      return action.user;
    default:
      return state;
  }
};

const authStatus = (state = false, action: AnyAction) => {
  switch (action.type) {
    case 'login':
      return true;
    case 'logout':
      return false;
    default:
      return state;
  }
};

const adminStatus = (state = false, action: AnyAction) => {
  switch (action.type) {
    case 'login':
      return action.user.admin;
    case 'logout':
      return false;
    default:
      return state;
  }
};

const auth = {
  authUser,
  authStatus,
  adminStatus
};
export default auth;