import React from 'react';
import axios from 'axios';
import Loader from "./shared/Loader";
import Nav from "./shared/Nav";
import {Link} from "react-router-dom"
import PeopleFilter from "./shared/PeopleFilter";
import Paginator from "./shared/Paginator";
import FloatingButton from "./shared/FloatingButton";
import PageSummaries from "./shared/PageSummaries";

class CorvidPatients extends React.Component
{
    state = {
        patients: [],
        first_page_url: null,
        prev_page_url: null,
        next_page_url: null,
        last_page_url: null,
        total: 0,
        loader: true,
        path: `${process.env.REACT_APP_API}/api/people/corvid`,
        current_page: 1,
        page_loaded: false
    };

    constructor(props) {
        super(props);
    }

    async getData() {
        this.setState({loader: true});
        await axios.get(this.state.path,
            {headers : {Authorization: "Bearer " + localStorage.getItem('token')}})
            .then(response => {
                this.setState({
                    patients: response.data.data,
                    loader: false,
                    first_page_url: response.data.first_page_url,
                    prev_page_url: response.data.prev_page_url,
                    last_page_url: response.data.last_page_url,
                    next_page_url: response.data.next_page_url,
                    total: response.data.total,
                    current_page: response.data.current_page
                });
            });
    }

    fetchPage = pointers => {
        if (pointers === 'NEXT'
            && this.state.current_page <= this.state.total)
        {
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
        this.setState({
            page_loaded: true
        })
    }


    render() {
        let {loader, patients, page_loaded} = this.state;
        let loader_animation = (loader === true) ? <Loader/> : "";
        let items = patients.map((item, key) =>
            <DataColumn item={item}/>
        );

        if (page_loaded === false) {
            return <Loader />
        }

        return <div>
            <Nav page_title='Corvid-19 Infected Patients'/>
            <main>
                <div className="row">
                    <PageSummaries />
                    <PeopleFilter />
                </div>
                <div className="row">
                    <div className="col l12">
                        <TableGrid items={items} />
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

function TableGrid(props)
{
    return <table className="highlight">
        <thead>
        <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Phone</th>
            <th>ID/Passport</th>
            <th>Occupation</th>
            <th>Date of Birth</th>
            <th>Health State</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
            {props.items}
        </tbody>
    </table>
}

function DataColumn(props)
{
    return <tr key={props.item.id}>
        <td>{`
            ${props.item.first_name} 
            ${props.item.surname} 
            ${props.item.last_name}`
        }
        </td>
        <td>{props.item.sex}</td>
        <td>{props.item.phone}</td>
        <td>{props.item.national_id}</td>
        <td>{props.item.occupation}</td>
        <td>{props.item.date_of_birth}</td>
        <td>{props.item.current_corvid_state}</td>
        <td>
            <Link to={`/person/${props.item.id}`} className="waves-effect waves-teal btn-flat">
                <i className="material-icons left">remove_red_eye</i>
            </Link>
        </td>
    </tr>
}

export default CorvidPatients;