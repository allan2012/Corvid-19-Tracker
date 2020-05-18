import React from 'react';
import Dashboard from './components/Dashboard';
import Login from "./components/Login";
import Logout from "./components/Logout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CorvidPatients from "./components/CorvidPatients";
import Quarantined from "./components/Quarantined";
import NoMatch from "./components/NoMatch";
import Person from "./components/Person";
import Reports from "./components/Reports";
import PersonForm from "./components/PersonForm"
import Centers from "./components/Centers"
import Nav from "./components/shared/Nav";
import {AppContext} from "./components/AppContext"
import axios from 'axios';


class App extends React.Component {

	constructor(props) {

		super(props);

		this.updateAppBarTitle = (title) => {
			this.setState({
				...this.state, appBarTitle: title,
			})
		}

		this.state = {
			appBarTitle: 'Corvid Tracker',
			updateAppBarTitle: this.updateAppBarTitle,
			counties: []
		}
	}

	async fetchCounties() {
		await axios.get(`${process.env.REACT_APP_API}/api/counties`, {
			headers: {
				Authorization:
					"Bearer " + localStorage.getItem('token')
			}
		}).then((response) => {
			this.setState({
				...this.state, counties: response.data,
			})
		});
	}

	async componentDidMount() {
		this.fetchCounties();
	}

	render() {
		return (
			<AppContext.Provider value={this.state}>
				<Router>
					<div>
						<Switch>
							<Route 
								exact path='/' 
								component={LoginContainer}
								/>
							<Route component={DefaultContainer}/>
							<Route component={NoMatchContainer}/>
						</Switch>
					</div>
				</Router>
			</AppContext.Provider>
		);
	}

}

const LoginContainer = () => (
	<div>
		<Route path="/" component={Login} exact/>
	</div>
)

const NoMatchContainer = () => (
	<div>
		<Route path="*">
			<NoMatch/>
		</Route>
	</div>
)

const DefaultContainer = () => (
	<AppContext.Consumer>
		{value => <div>
			<Nav page_title={value.appBarTitle} />
			<Route path="/dashboard" component={Dashboard}/>
			<Route path="/corvid-patients" component={CorvidPatients} exact/>
			<Route path="/quarantined" component={Quarantined} exact/>
			<Route path="/centers" component={Centers} exact/>
			<Route path="/reports" component={Reports} exact/>
			<Route path="/logout" component={Logout} exact/>
			<Route path="/person/:id" component={Person} exact/>
			<Route path="/person-form/:id" component={PersonForm} exact/>
		</div> }
	</AppContext.Consumer>
)

export default App;
