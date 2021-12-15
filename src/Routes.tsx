import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import BrowseGalleries from "./components/BrowseGalleries";
import GalleryPage from "./components/Gallery";
import ActiveJamRedirect from "./components/Gallery/ActiveJamRedirect";
import CreateGalleryPage from "./components/Gallery/CreateGalleryPage";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { useAppDispatch } from "./hooks";
import authService from "./service/authService";

const Routes = () => {
  const dispatch = useAppDispatch();
  authService.auth().then(user => {
    if (!!user) dispatch({
      type: 'login',
      user
    });
  });
  return (
    <BrowserRouter>
      <Switch>
        <Route path={['/', '/home']} exact={true} component={HomePage}/>
        <Route path={['/login', '/register', '/profile', '/users/profile']} component={Profile}/>
        <Route path={['/browse-jams', '/browse-galleries']} component={BrowseGalleries}/>
        <Route path={['/active-jam']} component={ActiveJamRedirect}/>
        <Route path={[`/jam/create`,`/jam/edit/:galleryId`]} exact={true} component={CreateGalleryPage} />
        <Route path={['/jam/:id', '/gallery/:id']} component={GalleryPage}/>
        <Route path={['/privacy-policy']} component={PrivacyPolicy}/>

        <Route path={['']}>
          <Redirect to={'/'}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;