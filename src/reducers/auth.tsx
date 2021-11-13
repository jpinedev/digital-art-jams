import { AnyAction } from "@reduxjs/toolkit";
import { UnregisteredUser } from "../model/user/user";

const auth = (state = UnregisteredUser, action: AnyAction) => {
  switch (action.type) {
    case 'login':
      return action.user;
    default:
      return state;
  }
};

export default auth;