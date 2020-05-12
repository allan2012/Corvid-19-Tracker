import React from 'react';
import axios from 'axios';
import Loader from "./shared/Loader";
import Nav from "./shared/Nav";
import { Link } from "react-router-dom"
import PeopleFilter from "./shared/PeopleFilter";
import Paginator from "./shared/Paginator";
import FloatingButton from "./shared/FloatingButton";
import TableHeader from "./shared/TableHeader"
import TableRow from './shared/TableRow';
import MaterialIcon from './shared/MaterialIcon';

class CorvidPatients extends React.Component {
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
        q: null
    };

    async getData() {
        this.setState({ loader: true });
        let query_filter = '';
        let filter = false;

        if (this.state.health_state !== null) {
            query_filter = `&health_state=${this.state.health_state}`;
            filter = true;
        }

        if (this.state.q !== null) {
            query_filter = query_filter + `&q=${this.state.q}`;
            filter = true;
        }

        let URL = `${this.state.path}${query_filter}`;

        await axios.get(URL,{
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
        this.setState({
            page_loaded: true
        })
    }


    render() {
        let { patients, page_loaded } = this.state;
        let items = patients.map((item, key) =>
            <TableRow
                column_values={[
                    `
                    ${item.first_name} 
                    ${item.surname} 
                    ${item.last_name}`,
                    item.sex,
                    item.phone,
                    item.national_id,
                    item.occupation,
                    item.date_of_birth,
                    item.current_corvid_state,
                    <Link
                        to={`/person/${item.id}`}
                        className="waves-effect waves-teal btn-flat">
                        <MaterialIcon icon="remove_red_eye" />
                    </Link>
                ]}
            />
        );

        if (page_loaded === false) {
            return <Loader />
        }

        return <div>
            <Nav page_title='Corvid-19 Infected Patients' />
            <main>
                <div className="row">
                    <PeopleFilter 
                        search_function={this.filterData} 
                        handle_change={this.handleChange} 
                    />
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
            <FloatingButton />
        </div>
    }
}

const TableGrid = (props) => {
    return <table className="highlight">
        <TableHeader
            column_titles={[
                'Name', 'Sex',
                'Phone',
                'ID/Passport',
                'Occupation',
                'Date of Birth',
                'Health State',
                ''
            ]}
        />
        <tbody>
            {props.items}
        </tbody>
    </table>
}

export default CorvidPatients;
