import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from './Context';

import HomePage from '../pages/home-page';
import RegisterPage from '../pages/user-register-page';
import LoginPage from '../pages/user-login-page';
import ErrorPage from '../pages/error-page';
import ChatPage from '../pages/chat-page';
import FriendsPage from '../pages/friends-page';
import AllFriendsPage from '../pages/friends-all-page';
import AddFriendsPage from '../pages/friends-add-page';
import FriendRequestsPage from '../pages/friends-requests-page';

function App() {
  const { loggedIn } = useContext(UserContext)
  return (

    <Router>
      <Switch>

        <Route exact path='/'>
          <HomePage />
        </Route>

        <Route exact path='/chat'>
          {loggedIn ? <ChatPage /> : <ErrorPage />}
        </Route>

        <Route exact path='/chat/:id' component={loggedIn ? ChatPage : ErrorPage}>
          {/* <ChatPage /> */}
        </Route>

        <Route exact path='/friends'>
          {loggedIn ? <FriendsPage /> : <ErrorPage />}
        </Route>

        <Route exact path='/friends/all'>
          {loggedIn ? <AllFriendsPage /> : <ErrorPage />}
        </Route>

        <Route exact path='/friends/requests'>
          {loggedIn ? <FriendRequestsPage /> : <ErrorPage />}

        </Route>

        <Route exact path='/friends/add'>
          {loggedIn ? <AddFriendsPage /> : <ErrorPage />}
        </Route>

        <Route exact path='/login'>
          {loggedIn ? <ErrorPage /> : <LoginPage />}
        </Route>

        <Route exact path='/register'>
          {loggedIn ? <ErrorPage /> : <RegisterPage />}
        </Route>


        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
