import React from 'react';
import axios from 'axios';
import Loader from "./shared/Loader"
import PeopleFilter from "./shared/PeopleFilter";
import Paginator from "./shared/Paginator";
import FloatingButton from "./shared/FloatingButton";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MaterialIcon from './shared/MaterialIcon';
import { Link } from "react-router-dom"
import isAuthenticated from './shared/Auth'
import { AppContext } from './AppContext'

class Quarantined extends React.Component {

    static contextType = AppContext;

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


    async getData() {
        this.setState({ loader: true });
        await axios.get(this.state.path,
            { headers: { Authorization: "Bearer " + localStorage.getItem('token') } })
            .then(response => {
                this.setState({
                    data: response.data,
                    members: response.data.data,
                    loader: false,
                    first_page_url: response.data.first_page_url,
                    prev_page_url: response.data.prev_page_url,
                    last_page_url: response.data.last_page_url,
                    next_page_url: response.data.next_page_url,
                    total: response.data.total,
                    current_page: response.data.current_page
                });

            }).catch(() => {

            })
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

    async componentDidMount() 
    {
        if (false === isAuthenticated()) {
            this.props.history.push('/')
        }
        this.context.updateAppBarTitle('Quarantined Citizens')
        await this.getData();
        this.setState({
            page_loaded: true
        }, this.getData);
    }

    render() {
        let { page_loaded } = this.state;
        let items = this.state.members.map(item =>
            <TableRow
                key={item.id}
            >
                <TableCell>{`${item.first_name}  
                ${item.surname}  
                ${item.last_name}`}</TableCell>
                <TableCell>{(item.sex === 'M') ? 'Male' : 'Female'}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.national_id}</TableCell>
                <TableCell>{item.occupation}</TableCell>
                <TableCell>{item.date_of_birth}</TableCell>
                <TableCell>{item.current_corvid_state}</TableCell>
                <TableCell>
                    <Link
                        to={`/person/${item.id}`}
                        className="waves-effect waves-teal btn-flat">
                        <MaterialIcon icon="remove_red_eye" />
                    </Link>
                </TableCell>
            </TableRow>
        );

        if (page_loaded === false) {
            return <Loader />
        }

        return <div>
            <main>
                <div className="row">
                    <PeopleFilter />
                </div>
                <div className="row">
                    <div className="col l12">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Sex</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>ID/Passport</TableCell>
                                    <TableCell>Occupation</TableCell>
                                    <TableCell>Date Of Birth</TableCell>
                                    <TableCell>Health Status</TableCell>
                                    <TableCell />
                                </TableRow>
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
            <FloatingButton />
        </div>

    }
}

export default Quarantined;
