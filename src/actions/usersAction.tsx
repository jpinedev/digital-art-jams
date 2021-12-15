import User from "../model/user/user";
import usersService from "../service/usersService";
import { AppDispatch } from "../store";

export const getUser = (dispatch: AppDispatch, username: string) => 
  usersService.getUser(username)
    .then(user => {
      dispatch({
        type: 'get-user',
        username,
        user
      });
      return user;
    });

export const promoteUser = (dispatch: AppDispatch, user: User) => 
  usersService.promoteToAdmin(user)
    .then(() => {
      dispatch({
        type: 'promote-user',
        user
      });
      return user;
    });

const usersAction = {
  getUser,
  promoteUser
};
export default usersAction;