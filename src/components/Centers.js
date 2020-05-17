import React from 'react';
import axios from 'axios';
import Loader from "./shared/Loader";
import Paginator from "./shared/Paginator";
import FloatingButton from "./shared/FloatingButton";
import MaterialIcon from './shared/MaterialIcon';
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { Link } from "react-router-dom";

class Centers extends React.Component {
    state = {
        data: [],
        first_page_url: null,
        prev_page_url: null,
        next_page_url: null,
        last_page_url: null,
        total: 0,
        page_loaded: false,
        path: `${process.env.REACT_APP_API}/api/centers`,
        current_page: 1,
    };

    async getData() {
        this.setState({ loader: true });
        await axios.get(this.state.path,
            {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem('token')
                }
            })
            .then(response => {
                let data = response.data;
                this.setState({
                    data: data.data,
                    first_page_url: data.first_page_url,
                    prev_page_url: data.prev_page_url,
                    last_page_url: data.last_page_url,
                    next_page_url: data.next_page_url,
                    total: data.total,
                    current_page: data.current_page
                });
            });
    }

    fetchPage = pointers => {
        if (pointers === 'NEXT'
            && this.state.current_page <= this.state.total) {
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
        })
    }


    render() {
        let { page_loaded, data } = this.state
        let items = data.map((item, key) =>
            <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                    <Link
                        to={`/center/${item.id}`}
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
                    <div className="col l5">
                        <Table>
                            <TableHead>
                                <TableCell>Name</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell />
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

export default Centers;
