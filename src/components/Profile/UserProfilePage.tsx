import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import EditProfile from "./EditProfile";
import ProfileComponent from "./ProfileComponent";

const UserProfilePage = () => {
  const auth = useAppSelector(state => state.auth);

  return (
    <>
      { auth.registered &&
        <Switch>
          <Route path={'/profile'} exact={true}>
            <ProfileComponent user={auth} canEdit={true} />
          </Route>
          <Route path={'/profile/edit'} exact={true}>
            <EditProfile />
          </Route>
        </Switch>
      }
      { !auth.registered &&
        <Redirect to={'/login'} />
      }
    </>
  );
};
export default UserProfilePage;
