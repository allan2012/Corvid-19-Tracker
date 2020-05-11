import React from 'react';
import axios from 'axios';
import Loader from "./shared/Loader";
import Nav from "./shared/Nav";
import PeopleFilter from "./shared/PeopleFilter";
import Paginator from "./shared/Paginator";
import FloatingButton from "./shared/FloatingButton";
import TableHeader from './shared/TableHeader';
import TableRow from './shared/TableRow';
import MaterialIcon from './shared/MaterialIcon';
import { Link } from "react-router-dom"

class Quarantined extends React.Component {
    state = {
        members: [],
        first_page_url: null,
        prev_page_url: null,
        next_page_url: null,
        last_page_url: null,
        total: 0,
        loader: true,
        page_loaded: false,
        path: `${process.env.REACT_APP_API}/api/people/quarantined`,
        current_page: 1,
    };

    constructor(props) {
        super(props);
    }

    async getData() {
        this.setState({ loader: true });
        await axios.get(this.state.path,
            { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
            .then(response => {
                this.setState({
                    members: response.data.data,
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
        if (pointers === 'NEXT' && this.state.current_page <= this.state.total) {
            this.setState({
                path: this.state.next_page_url
            }, this.getData);
        }

        if (pointers === 'BACK' && this.state.current_page !== 1) {
            this.setState({
                path: this.state.prev_page_url
            }, this.getData);
        }
    }

    async componentDidMount() {
        await this.getData();
        this.setState({
            page_loaded: true
        }, this.getData);
    }


    render() {
        let { page_loaded } = this.state;
        let items = this.state.members.map((item, key) =>
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
            <Nav page_title='Quarantined Citizens' />
            <main>
                <div className="row">
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

export default Quarantined;
