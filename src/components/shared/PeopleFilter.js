import React from "react";
import M from 'materialize-css';
import Button from '@material-ui/core/Button';

class PeopleFilter extends React.Component{

	componentDidMount() {
		M.AutoInit();
	}

	render() {
		return <div className="col s12">
			<div className="row">
				<div className="input-field col l2">
					<i className="material-icons prefix">search</i>
					<input id="icon_prefix" name="q" onChange={this.props.handle_change} type="text" className="validate"/>
					<label htmlFor="icon_prefix">Search</label>
				</div>
				<div className="input-field col l2">
					<select name='health_state' onChange={this.props.handle_change}>
						<option value="">Health state</option>
						<option value="CRITICAL">CRITICAL</option>
						<option value="DIED">DIED</option>
						<option value="STABLE">STABLE</option>
						<option value="RECOVERED">RECOVERED</option>
					</select>
				</div>
				<div className="input-field col l2">
					<select>
						<option value="">Gender</option>
						<option value="1">Male</option>
						<option value="2">Female</option>
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
