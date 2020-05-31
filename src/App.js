import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, Redirect
} from "react-router-dom";
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import LoginPage from './components/LoginPage/login.component';
import FeedPage from './components/FeedPage/feeds.component';
import HomePage from './components/HomePage/home.component';
import SignUpPage from './components/SignUpPage/signup.component'
import TopicSelectionPage from './components/TopicSelectionPage/topicSelection.component'


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignUpPage} />
        <PrivateRoute path="/home">
          < HomePage />
        </PrivateRoute>
        <PrivateRoute path="/topics">
          < TopicSelectionPage />
        </PrivateRoute>
        <PrivateRoute path="/feeds">
          <FeedPage />
        </PrivateRoute>
        <PrivateRoute path="/">
          < HomePage />
        </PrivateRoute>
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  debugger;
  const isUserLoggedIn = sessionStorage.getItem('isLoggedIn');
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUserLoggedIn ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}


export default App;
