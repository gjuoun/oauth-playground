
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from './pages/App/App';
import Oauth from './pages/Oauth/Oauth';


export default function Routes() {
  return <Router>
    <Switch>
      
      <Route path="/oauth">
        <Oauth />
      </Route>
      <Route path="/">
        <App />
      </Route>
    </Switch>
  </Router>
}