import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import User, { UnregisteredUser } from './model/user/user';

function App() {
  let user: User = UnregisteredUser;
  return (
    <BrowserRouter>
      <h1>
        <i className="fas fa-pencil-alt fa-fw"></i>
        Digital Art Jams
      </h1>
    </BrowserRouter>
  );
}

export default App;
