import React from 'react';
import {Nav} from "./shared/Nav";
import axios from 'axios';
import isAuthenticated from './shared/Auth'

class Dashboard extends React.Component {

    state = { data: null }

    render() {
        return (
            <div>
                <Nav/>
                <p>This is the awesome dashboard I created</p>
            </div>
        )
    }

    fetchData = () => {
        let token = localStorage.getItem('token')
        let url = `http://localhost/jwt/students?token=${token}`;
        axios.get(url).then((response) => {
            this.setState({data: response.data})
        });
        console.log(this.state)
    }

    componentDidMount()
    {
        if (false === isAuthenticated()) {
            this.props.history.push('/')
        }

        this.fetchData();
    }
}

export default Dashboard;