import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from "./components/Login";
import Logout from "./components/Logout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Tenants from "./components/Tenants";

class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/" component={Login} exact/>
              <Route path="/tenants" component={Tenants} exact/>
              <Route path="/logout" component={Logout} exact/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
