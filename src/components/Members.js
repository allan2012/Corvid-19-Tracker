import React from 'react';
import axios from 'axios';
import Loader from "./shared/Loader";
import {Link} from "react-router-dom";
import Nav from "./shared/Nav";

class Members extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        members: [],
        first_page_url: null,
        prev_page_url: null,
        next_page_url: null,
        last_page_url: null,
        total: 0,
        loader: true,
        path: 'http://127.0.0.1:8000/api/members',
        current_page: 1,
    };

    async getData() {
        this.setState({loader: true});
        await axios.get(this.state.path)
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
        if (pointers === 'NEXT') {
            this.setState({
                path: this.state.next_page_url
            }, this.getData);
        }

        if (pointers === 'BACK') {
            this.setState({
                path: this.state.prev_page_url
            }, this.getData);
        }
    }

    async componentDidMount() {
        await this.getData();
    }


    render() {
        let loader = this.state.loader;
        const {activeItem} = this.state
        let loader_animation = (loader === true) ? <Loader/> : "";

        let items = this.state.members.map((item, key) =>
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.location}</td>
                <td>{item.level}</td>
                <td>{item.status}</td>
                <td>
                    <button className="waves-effect waves-teal btn-flat">
                        <i className="material-icons left">remove_red_eye</i>
                    </button>
                </td>
            </tr>
        );

        const trigger = <button><i className="material-icons">add</i></button>;
        return <div>
            <Nav/>
            <main>
                <div className="row content">
                    <div className="col l12">
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Level</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {items}
                        </tbody>
                    </table>
                </div>
                </div>
            </main>
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large red">
                    <i className="large material-icons">mode_edit</i>
                </a>
                <ul>
                    <li><a className="btn-floating red"><i className="material-icons">insert_chart</i></a></li>
                    <li><a className="btn-floating yellow darken-1"><i className="material-icons">format_quote</i></a>
                    </li>
                    <li><a className="btn-floating green"><i className="material-icons">publish</i></a></li>
                    <li><a className="btn-floating blue"><i className="material-icons">attach_file</i></a></li>
                </ul>
            </div>
        </div>
    }
}

export default Members;