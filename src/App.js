import React from 'react';
import Dashboard from './components/Dashboard';
import Login from "./components/Login";
import Logout from "./components/Logout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Members from "./components/Members";
import Payment from "./components/Payment";
import NoMatch from "./components/NoMatch";
import Member from "./components/Member";

class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/" component={Login} exact/>
              <Route path="/members" component={Members} exact/>
              <Route path="/payments" component={Payment} exact/>
              <Route path="/logout" component={Logout} exact/>
              <Route path="/member/:id" component={Member} exact/>
                <Route path="*">
                    <NoMatch />
                </Route>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
