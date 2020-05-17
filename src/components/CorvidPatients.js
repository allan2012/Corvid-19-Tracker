import React from 'react';
import axios from 'axios';
import Loader from "./shared/Loader";
import {Link} from "react-router-dom"
import PeopleFilter from "./shared/PeopleFilter";
import Paginator from "./shared/Paginator";
import FloatingButton from "./shared/FloatingButton";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import MaterialIcon from './shared/MaterialIcon';
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {AppContext} from './AppContext'
import isAuthenticated from './shared/Auth'

class CorvidPatients extends React.Component
{

	static contextType = AppContext;

	state = {
		patients: [],
		first_page_url: null,
		prev_page_url: null,
		next_page_url: null,
		last_page_url: null,
		total: 0,
		path: `${process.env.REACT_APP_API}/api/people/corvid?page=1`,
		current_page: 1,
		page_loaded: false,
		health_state: null,
		county_id: null,
		q: null
	};

	async getData() {
		this.setState({loader: true});
		let query_filter = '';
		let filter = false;

		if (this.state.health_state !== null) {
			query_filter = `&health_state=${this.state.health_state}`;
			filter = true;
		}

		if (this.state.county_id !== null) {
			query_filter = `&county_id=${this.state.county_id}`;
			filter = true;
		}

		if (this.state.q !== null) {
			query_filter = query_filter + `&q=${this.state.q}`;
			filter = true;
		}

		let URL = `${this.state.path}${query_filter}`;

		await axios.get(URL, {
			headers: {
				Authorization: "Bearer " + localStorage.getItem('token')
			}
		}).then(response => {
			this.setState({
				patients: response.data.data,
				first_page_url: response.data.first_page_url,
				prev_page_url: response.data.prev_page_url,
				last_page_url: response.data.last_page_url,
				next_page_url: response.data.next_page_url,
				total: response.data.total,
				current_page: response.data.current_page
			});
		});
	}

	filterData = () => {
		this.getData();
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	fetchPage = pointers => {
		if (pointers === 'NEXT'
			&& this.state.current_page <= this.state.total) {
			this.setState({
				path: this.state.next_page_url
			}, this.getData);
		}

		if (pointers === 'BACK'
			&& this.state.current_page !== 1) {
			this.setState({
				path: this.state.prev_page_url
			}, this.getData);
		}
	}

	async componentDidMount() {
		await this.getData();
		if (false === isAuthenticated()) {
            this.props.history.push('/')
        }
        this.context.updateAppBarTitle('Confirmed Corvid-19 Patients')
		this.setState({
			page_loaded: true
		})
	}

	render() {
		let {patients, page_loaded} = this.state;
		let items = patients.map((item, key) =>
			<TableRow key={item.id}>
				<TableCell>
					{`${item.first_name} 
                ${item.surname} 
                ${item.last_name}`}
				</TableCell>
				<TableCell>{item.sex}</TableCell>
				<TableCell>{item.phone}</TableCell>
				<TableCell>{item.national_id}</TableCell>
				<TableCell>{item.occupation}</TableCell>
				<TableCell>{item.date_of_birth}</TableCell>
				<TableCell>{item.current_corvid_state}</TableCell>
				<TableCell>
					<Link
						to={`/person/${item.id}`}
						className="waves-effect waves-teal btn-flat">
						<MaterialIcon icon="remove_red_eye"/>
					</Link>
				</TableCell>
			</TableRow>
		);

		if (page_loaded === false) {
			return <Loader/>
		}

		return <div>
			<main>
				<div className="row">
					<PeopleFilter
						search_function={this.filterData}
						handle_change={this.handleChange}
					/>
				</div>
				<div className="row">
					<div className="col l12">
						<Table>
							<TableHead>
								<TableCell>Name</TableCell>
								<TableCell>Sex</TableCell>
								<TableCell>Phone</TableCell>
								<TableCell>ID/Passport</TableCell>
								<TableCell>Occupation</TableCell>
								<TableCell>Date Of Birth</TableCell>
								<TableCell>Health Status</TableCell>
								<TableCell/>
							</TableHead>
							<TableBody>
								{items}
							</TableBody>
						</Table>
						<Paginator
							fetchPage={this.fetchPage}
							current_page={this.state.current_page}
						/>
					</div>
				</div>
			</main>
			<FloatingButton/>
		</div>
	}
}

export default CorvidPatients;
