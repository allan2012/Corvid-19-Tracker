import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import Loader from "./shared/Loader";
import MaterialIcon from "./shared/MaterialIcon"
import isAuthenticated from './shared/Auth'

class Person extends React.Component {

    state = {
        person: {},
        page_loaded: false
    };

    async getPersonData() {
        const {id} = this.props.match.params;
        await axios.get(`${process.env.REACT_APP_API}/api/people/${id}`,
            {headers: {Authorization: "Bearer " + localStorage.getItem('token')}})
            .then(response => {
                this.setState({
                    person: response.data
                });
            });
    }

    async componentDidMount() {
        if (false === isAuthenticated()) {
            this.props.history.push('/')
        }
        await this.getPersonData();
        this.setState({
            page_loaded: true
        });
    }

    render() {
        let {page_loaded, person} = this.state;

        if (page_loaded === false) {
            return <Loader/>
        }

        return <div>
            <main>
                <div className="row content">
                    <div className="col l6">
                        <div className="card horizontal">
                            <div className="card-stacked">
                                <div className="card-content" style={{lineHeight: '45px', fontSize: '14px'}}>
                                    <h4>{this.state.person.first_name} {this.state.person.surname}</h4>
                                    Date of Birth: {this.state.person.date_of_birth}
                                    <div className="divider"></div>
                                    National ID/Passport: {person.national_id}
                                    <div className="divider"></div>
                                    National ID/Passport: {person.national_id}
                                    <div className="divider"></div>
                                    Email: {person.email}
                                    <div className="divider"></div>
                                    Phone: {person.phone}
                                    <div className="divider"></div>
                                    Gender: {(person.sex === 'F') ? 'Female' : 'Male'}
                                    <div className="divider"></div>
                                    Occupation: {person.occupation}
                                    <div className="divider"></div>
                                    Contact Names: {person.contact_names}
                                    <div className="divider"></div>
                                    Contact Phone: {person.contact_phone}
                                    <div className="divider"></div>
                                    Contact Relation: {person.contact_relation}
                                    <div className="divider"></div>
                                    Physical Address: {person.physical_address}
                                    <div className="divider"></div>
                                    Notes: <br/>
                                    <span style={{lineHeight: '15px !important'}}>{person.notes}</span>
                                    <div className="divider"></div>
                                    <Link className="btn-small"
                                          to={`/person-form/${this.state.person.id}`}><MaterialIcon
                                        icon="create"/></Link>
                                    <button className="waves-effect waves-light btn-small red"><MaterialIcon
                                        icon="delete_forever"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    }
}

export default Person;
