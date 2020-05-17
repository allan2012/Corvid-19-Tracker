import React from "react";
import M from 'materialize-css';
import {AppContext} from '../AppContext';

class PeopleFilter extends React.Component{

	static contextType = AppContext;

	componentDidMount() {
		M.AutoInit();
	}

	render() {
		let counties = this.context.counties;

		let items = counties.map(item => (
			<option value={item.id}>{item.name}</option>
		))

		return <div className="col s12">
			<div className="row">
				<div className="input-field col l2">
					<i className="material-icons prefix">search</i>
					<input id="icon_prefix" name="q" onChange={this.props.handle_change} type="text" className="validate"/>
					<label htmlFor="icon_prefix">Search</label>
				</div>
				<div className="input-field col l2">
					<select  className='browser-default' name='health_state' onChange={this.props.handle_change}>
						<option value="">Health state</option>
						<option value="CRITICAL">CRITICAL</option>
						<option value="DIED">DIED</option>
						<option value="STABLE">STABLE</option>
						<option value="RECOVERED">RECOVERED</option>
					</select>
				</div>
				<div className="input-field col l2">
					<select  className='browser-default'>
						<option value="">Gender</option>
						<option value="1">Male</option>
						<option value="2">Female</option>
					</select>
				</div>
				<div className="input-field col l2">
					<select className='browser-default' name='county_id' onChange={this.props.handle_change}>
						<option value="">County</option>
						{items}
					</select>
				</div>
				<div className="input-field col l2">
					<button
						onClick={this.props.search_function}
						className='waves-effect waves-light btn'>Search
					</button>
				</div>
			</div>
		</div>
	}
}

export default PeopleFilter;
