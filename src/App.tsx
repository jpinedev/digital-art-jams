import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import { Provider } from 'react-redux';
import { store } from './store';
import ImageInspector from './components/ImageInspector';
import Profile from './components/Profile';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path={['/', '/home']} exact={true} component={HomePage}/>
        <Route path={['/login', '/register', '/profile', '/users/profile']} component={Profile}/>
        <Route path={['/image/:id']} component={ImageInspector}/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
