import React from 'react';
import axios from 'axios';
import Loader from "./shared/Loader";
import M from 'materialize-css';
import isAuthenticated from './shared/Auth'
import { AppContext } from './AppContext'

class PersonForm extends React.Component {

    static contextType = AppContext;

    state = {
        first_name: '',
        surname: '',
        last_name: '',
        sex: 'M',
        phone: '',
        county_id: '',
        email: '',
        date_of_birth: '',
        notes: '',
        contact_names: '',
        contact_phone: '',
        contact_relation: '',
        occupation: '',
        physical_address: '',
        confirmed_corvid: 0,
        page_loaded: false,
    };

    async getPersonData() {
        const { id } = this.props.match.params;
        await axios.get(`${process.env.REACT_APP_API}/api/people/${id}`,
            { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
            .then(response => {
                let person = response.data
                this.setState({
                    id: person.id,
                    first_name: person.first_name,
                    surname: person.surname,
                    last_name: person.last_name,
                    national_id: person.national_id,
                    sex: person.sex,
                    physical_address: person.physical_address,
                    date_of_birth: person.date_of_birth,
                    email: person.email,
                    county_id: person.county_id,
                    phone: person.phone,
                    notes: person.notes,
                    contact_names: person.contact_names,
                    contact_phone: person.contact_phone,
                    contact_relation: person.contact_relation,
                    occupation: person.occupation,
                    confirmed_corvid: person.confirmed_corvid,
                });
            });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    savePersonData = () => {
        this.save()
    }

    async save() {
        await axios.patch(`${process.env.REACT_APP_API}/api/people/${this.state.id}`,
            this.state, {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem('token')
            }
        }).then(response => {
            if (response.data.status === 'success') {
                M.toast({ html: 'Person saved successfully', classes: 'rounded, green' });
            } else {
                M.toast({ html: 'Error saving', classes: 'rounded, red' });
            }
        }).catch(error => {
            M.toast({ html: 'Error saving data', classes: 'rounded, red' });
        })
    }

    async componentDidMount() {
        if (false === isAuthenticated()) {
            this.props.history.push('/')
        }
        this.context.updateAppBarTitle(`Person Update Form`);
        await this.getPersonData();
        this.setState({
            page_loaded: true
        });
        M.AutoInit();

    }

    render() {
        let { page_loaded } = this.state;

        let counties = this.context.counties;


        let items = counties.map(item => (
            <option
                value={item.id}
                selected={item.id === this.state.county_id}>{item.name}
            </option>
        ))


        if (page_loaded === false) {
            return <Loader />
        }

        return <div>
            <main>
                <div className="row container content">
                    <div className="col l12">
                        <h4>{this.state.first_name} {this.state.surname}</h4>
                    </div>
                    <div className="col l6">
                        <table className='custom_table'>
                            <tr>
                                <td>First Name</td>
                                <td>
                                    <input type="text"
                                        name="first_name"
                                        onChange={this.handleChange}
                                        value={this.state.first_name} />
                                </td>
                            </tr>
                            <tr>
                                <td>Surname</td>
                                <td>
                                    <input
                                        type="text"
                                        name="surname"
                                        value={this.state.surname}
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={this.state.last_name}
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: '250px' }}>Date Of Birth</td>
                                <td>
                                    <input
                                        type="date"
                                        onChange={this.handleChange}
                                        value={this.state.date_of_birth}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>ID/Passport</td>
                                <td>
                                    <input
                                        type="text"
                                        name="national_id"
                                        value={this.state.national_id}
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Email Address</td>
                                <td>
                                    <input
                                        type="text"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>County</td>
                                <td>
                                    <select
                                        className='browser-default'
                                        name='county_id'
                                        onChange={this.handleChange}
                                    >
                                        <option>Select County</option>
                                        {items}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>
                                    <select
                                        className='browser-default'
                                        name='sex'
                                        onChange={this.handleChange}
                                    >
                                        <option>Select gender</option>
                                        <option value='M' selected={this.state.sex === 'M'}>Male</option>
                                        <option value='F' selected={this.state.sex === 'F'}>Female</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="col l6">
                        <table className='custom_table'>
                            <tr>
                                <td>Phone</td>
                                <td>
                                    <input
                                        name="phone"
                                        type="text"
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Confirmed Corvid-19 Infection</td>
                                <td>
                                    <select
                                        className='browser-default'
                                        name='confirmed_corvid'
                                        onChange={this.handleChange}
                                    >
                                        <option>Select corvid</option>
                                        <option value='0' selected={this.state.confirmed_corvid === 0}>NO</option>
                                        <option value='1' selected={this.state.confirmed_corvid === 1}>YES</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Occupation/Profession</td>
                                <td>
                                    <input
                                        name="occupation"
                                        type="text"
                                        value={this.state.occupation}
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Contact Name</td>
                                <td>
                                    <input
                                        name="contact_names"
                                        type="text"
                                        value={this.state.contact_names}
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Contact Phone</td>
                                <td>
                                    <input
                                        name="contact_phone"
                                        type="text"
                                        value={this.state.contact_phone}
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Contact Relation</td>
                                <td>
                                    <select
                                        name='contact_relation'
                                        onChange={this.handleChange}
                                    >
                                        <option>Select relation</option>
                                        <option value='PARENT' selected={this.state.contact_relation === 'PARENT'}>PARENT</option>
                                        <option value='GUARDIAN' selected={this.state.contact_relation === 'GUARDIAN'}>GUARDIAN</option>
                                        <option value='FRIEND' selected={this.state.contact_relation === 'FRIEND'}>FRIEND</option>
                                        <option value='SPOUSE' selected={this.state.contact_relation === 'SPOUSE'}>SPOUSE</option>
                                        <option value='RELATIVE' selected={this.state.contact_relation === 'RELATIVE'}>RELATIVE</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Physical Address</td>
                                <td><input
                                    name='physical_address'
                                    type="text"
                                    value={this.state.physical_address}
                                    onChange={this.handleChange}
                                /></td>
                            </tr>
                            <tr>
                                <td>Notes</td>
                                <td>
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <textarea
                                                name="notes"
                                                className='materialize-textarea'
                                                onChange={this.handleChange}
                                            >
                                                {this.state.notes}
                                            </textarea>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <button
                        className="btn"
                        onClick={this.savePersonData}>Save</button>
                </div>
            </main>
        </div>
    }
}

export default PersonForm;
