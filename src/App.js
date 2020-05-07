import React from 'react';
import Dashboard from './components/Dashboard';
import Login from "./components/Login";
import Logout from "./components/Logout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CorvidPatients from "./components/CorvidPatients";
import Quarantined from "./components/Quarantined";
import NoMatch from "./components/NoMatch";
import Member from "./components/Member";
import Centers from "./components/Centers";

class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/" component={Login} exact/>
              <Route path="/corvid-patients" component={CorvidPatients} exact/>
              <Route path="/quarantined" component={Quarantined} exact/>
              <Route path="/centers" component={Centers} exact/>
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
