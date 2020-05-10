import React from 'react';
import {useParams, Link} from "react-router-dom";
import axios from 'axios';
import Nav from "./shared/Nav";
import Loader from "./shared/Loader";

class Person extends React.Component
{
    state = {
        person: {},
        page_loaded: false
    };

    constructor(props) {
        super(props);
    }

    async getPersonData() {
        const {id} = this.props.match.params;
        await axios.get(`${process.env.REACT_APP_API}/api/people/${id}`,
            {headers : {Authorization: "Bearer " + localStorage.getItem('token')}})
            .then(response => {
                this.setState({
                    person: response.data
                });
            });
    }

    async componentDidMount() {
        await this.getPersonData();
        this.setState({
            page_loaded: true
        });
    }

    render() {
        let {page_loaded} = this.state;

        if(page_loaded === false) {
            return <Loader />
        }

        return <div>
            <Nav page_title={`Person ID: ${this.state.person.id}`}/>
            <main>
                <div className="row content">
                    <div className="col l4">
                        <h5>{this.state.person.first_name} {this.state.person.surname}</h5>
                        <table className='highlight'>
                            <tbody>
                            <tr>
                                <td style={{width: '250px'}}>Date Of Birth</td>
                                <td>{this.state.person.date_of_birth}</td>
                            </tr>
                            <tr>
                                <td>ID/Passport</td>
                                <td>{this.state.person.national_id}</td>
                            </tr>
                            <tr>
                                <td>Email Address</td>
                                <td>{this.state.person.email}</td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>{this.state.person.sex}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>{this.state.person.phone}</td>
                            </tr>
                            <tr>
                                <td>Confirmed Corvid-19 Infection</td>
                                <td>{(this.state.person.corvid_confirmed === true) ? 'YES' : 'NO'}</td>
                            </tr>
                            <tr>
                                <td>Occupation/Profession</td>
                                <td>{this.state.person.occupation}</td>
                            </tr>
                            <tr>
                                <td>Contact Name</td>
                                <td>{this.state.person.contact_names}</td>
                            </tr>
                            <tr>
                                <td>Contact Phone</td>
                                <td>{this.state.person.contact_phone}</td>
                            </tr>
                            <tr>
                                <td>Contact Relation</td>
                                <td>{this.state.person.contact_relation}</td>
                            </tr>
                            <tr>
                                <td>Physical Address</td>
                                <td>{this.state.person.physical_address}</td>
                            </tr>
                            <tr>
                                <td>Notes</td>
                                <td>{this.state.person.notes}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <Link className="btn" to={`/person-form/${this.state.person.id}`}>Edit</Link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    }
}

export default Person;
