import React from "react";
import { Route, Switch } from "react-router";
import LoginComponent from "./LoginComponent";
import { HamburgerNavOptions } from "../Navigation/HamburgerNav";
import WebsiteHeader from "../WebsiteHeader";
import ProfilePage from "./ProfilePage";
import UserProfilePage from "./UserProfilePage";
import RegisterComponent from "./RegisterComponent";

const Profile = () => {
  return (
    <div className="primary min-vh-100">
      <Switch>
        <Route path={['/login', '/register']} exact={true}>
          <WebsiteHeader pushContent={true} activeLink={HamburgerNavOptions.login_register}/>
        </Route>
        <Route path={['/profile', '/profile/edit']} exact={true}>
          <WebsiteHeader pushContent={true} activeLink={HamburgerNavOptions.profile}/>
        </Route>
        <Route path={['/users/profile']}>
          <WebsiteHeader pushContent={true}/>
        </Route>
      </Switch>
      <div className="container text-secondary p-3">
        <Switch>
          <Route path={['/login']} exact={true} component={LoginComponent}/>
          <Route path={['/register']} exact={true} component={RegisterComponent}/>
          <Route path={['/profile', '/profile/edit']} exact={true} component={UserProfilePage}/>
          <Route path={['/users/profile/:id']} component={ProfilePage}/>
        </Switch>
      </div>
    </div>
  )
};

export default Profile;