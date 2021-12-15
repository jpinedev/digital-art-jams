import { AnyAction } from "@reduxjs/toolkit";
import User from "../model/user/user";

type UsersMap = {[key: string]: User};

const userMap = (state: UsersMap = { }, action: AnyAction) => {
  switch (action.type) {
    case 'get-user': {
      let newState = { ...state };
      newState[action.username] = action.user;
      return newState;
    }
    case 'promote-user': {
      let newState = { ...state };
      if (!!newState[action.user.username])
        newState[action.user.username] = { ...action.user, admin: true };
      return newState;
    }
    default:
      return state;
  }
};

const usersReducer = {
  userMap
};
export default usersReducer;