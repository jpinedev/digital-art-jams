import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import User, { UnregisteredUser } from './model/user/user';

function App() {
  let user: User = UnregisteredUser;
  return (
    <BrowserRouter>
      <Route path={['/', '/home']}>
        <HomePage registered={user.registered}/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
