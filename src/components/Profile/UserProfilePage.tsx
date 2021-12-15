import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import EditProfile from "./EditProfile";
import ProfileComponent from "./ProfileComponent";

const UserProfilePage = () => {
  const auth = useAppSelector(state => state.authStatus);
  const user = useAppSelector(state => state.authUser);
  
  return (
    <>
      { !auth &&
        <Redirect to={'/login'} />
      }
      <Switch>
        <Route path={'/profile'} exact={true}>
          <ProfileComponent user={user} canEdit={true} />
        </Route>
        <Route path={'/profile/edit'} exact={true}>
          <EditProfile />
        </Route>
      </Switch>
    </>
  );
};
export default UserProfilePage;
