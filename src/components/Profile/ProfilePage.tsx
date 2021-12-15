import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import usersAction from "../../actions/usersAction";
import { useAppDispatch, useAppSelector } from "../../hooks";
import User from "../../model/user/user";
import ProfileComponent from "./ProfileComponent";

interface ProfileParams {
  username: string
}

const ProfilePage = () => {
  const {username} = useParams<ProfileParams>();

  const dispatch = useAppDispatch();
  const usersMap = useAppSelector(state => state.usersMap);
  const [user, setUser] = useState<User>();

  const history = useHistory();

  useEffect(() => {
    if (!!usersMap[username])
      setUser(usersMap[username]);
    else 
      usersAction.getUser(dispatch, username)
        .catch(() => history.replace(`/profile`));
  }, [username, dispatch, usersMap, history]);
  
  return !!user ? <ProfileComponent user={user}/> : (<></>);
};
export default ProfilePage;
