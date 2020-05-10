import React from 'react';
import Dashboard from './components/Dashboard';
import Login from "./components/Login";
import Logout from "./components/Logout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CorvidPatients from "./components/CorvidPatients";
import Quarantined from "./components/Quarantined";
import NoMatch from "./components/NoMatch";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm"
import Centers from "./components/Centers"

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
              <Route path="/person/:id" component={Person} exact/>
              <Route path="/person-form/:id" component={PersonForm} exact/>
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
