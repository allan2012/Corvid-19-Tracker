import React from 'react';
import Nav from "./shared/Nav";
import axios from 'axios';
import isAuthenticated from './shared/Auth'
import {StartBoard} from "./shared/StatBoard";
import {Link} from "react-router-dom";
import CircularLoader from "./shared/CircularLoader";

class Dashboard extends React.Component {

    state = {
        data: {},
        loading: true,
    };

    render() {
        let loading = this.state.loading;
        const {activeItem} = this.state
        let people_count = 'loading...';
        if (loading === false) {
            people_count = this.state.data.people_count;
        }
        return (<div>
            <Nav/>
            <main>
                <div className="row content">
                    <div className="col l3">
                        <div className="card-panel hoverable"><i className="material-icons large">people</i>
                            <h5>{(this.state.data.people_count === undefined) ? <CircularLoader/> : this.state.data.people_count.toLocaleString() } Enlisted</h5>
                            </div>
                        </div>
                        <div className="col l3">
                            <div className="card-panel hoverable">
                                <i className="material-icons large">location_city</i>
                                <h5>{(this.state.data.quarantine_centers_count === undefined) ? <CircularLoader/> : this.state.data.quarantine_centers_count } Quarantine Center</h5>
                            </div>
                        </div>
                        <div className="col l3">
                            <div className="card-panel hoverable">
                                <i className="material-icons large">local_hotel</i>
                                <h5>{this.state.data.corvid_fatalities_count} Fatalities</h5>
                            </div>
                        </div>
                        <div className="col l3">
                            <div className="card-panel hoverable">
                                <i className="material-icons large">sentiment_very_satisfied</i>
                                <h5>{this.state.data.corvid_recovered_count} Recovered</h5>
                            </div>
                        </div>
                    </div>
                    <div className="row content">
                        <div className="col l6">
                            <div className="card-panel hoverable">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Item Name</th>
                                        <th>Item Price</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        <td>Alvin</td>
                                        <td>Eclair</td>
                                        <td>$0.87</td>
                                    </tr>
                                    <tr>
                                        <td>Alan</td>
                                        <td>Jellybean</td>
                                        <td>$3.76</td>
                                    </tr>
                                    <tr>
                                        <td>Jonathan</td>
                                        <td>Lollipop</td>
                                        <td>$7.00</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col l6">
                            <div className="card-panel hoverable">

                            </div>
                        </div>
                    </div>
            </main>
        </div>)
    }

    refreshData = () => {
        this.setState({loading: true});
        this.fetchData();
    }

    async fetchData() {
        await axios.get(`${process.env.REACT_APP_API}/api/summary-statistics`, {
           headers : {Authorization: "Bearer " + localStorage.getItem('token')}
        }).then((response) => {
            this.setState({
                data: response.data,
                loading: false
            })
        });
    }

    async componentDidMount() {
        if (false === isAuthenticated()) {
        this.props.history.push('/')
    }
        await this.fetchData();
    }
    }

    export default Dashboard;