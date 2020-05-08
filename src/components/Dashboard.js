import React from 'react';
import Nav from "./shared/Nav";
import axios from 'axios';
import isAuthenticated from './shared/Auth'
import Loader from "./shared/Loader";
import { XYPlot, LineSeries, XAxis, YAxis} from 'react-vis';

class Dashboard extends React.Component {

    state = {
        data: {},
        loading: true,
        page_loaded: false
    };

    render() {
        let { loading, page_loaded, data } = this.state;
        let people_count = 'loading...';
        if (loading === false) {
            people_count = this.state.data.people_count;
        }

        if (page_loaded === false) {
            return <Loader />
        }

        const data_ = [
            {x: 20, y: 9},
            {x: 21, y: 5},
            {x: 22, y: 10},
            {x: 23, y: 44},
            {x: 24, y: 56},
            {x: 25, y: 23},
            {x: 26, y: 22},
            {x: 27, y: 3},
            {x: 28, y: 2},
            {x: 29, y: 0},
            {x: 30, y: 44},
            {x: 31, y: 12}
          ];

        return (<div>
            <Nav page_title='Dashboard' />
            <main>
                <div className="row content">
                    <div className="col l12">
                        <h5 className='standard-custom-header'>Infection trend last 30 Days</h5>
                        <XYPlot 
                            height={300} 
                            width={1000}>
                                <XAxis />
                                <YAxis />
                            <LineSeries data={data_} />
                        </XYPlot>
                    </div>
                    <div className="col l12 content dashboard-summary">
                        <div className="col l4 content">
                            <ul className="collection with-header">
                                <li className="collection-header"><h5>Infected Count Summary</h5></li>
                                <Enlisted text='Cofirmed' color='red' scalar='334' />
                                <Enlisted text='Recovered' scalar='856' />
                                <Enlisted text='Tracked' scalar='7,856' />
                                <Enlisted text='Critical' scalar='63' />
                            </ul>
                        </div>
                        <div className="col l4 content">
                            <ul className="collection with-header">
                                <li className="collection-header"><h5>Infected Demographics</h5></li>
                                <li className="collection-item"><div>Female<a href="#!" className="secondary-content">34%</a></div></li>
                                <li className="collection-item"><div>Male<a href="#!" className="secondary-content">66%</a></div></li>
                                <li className="collection-item"><div>60 and above<a href="#!" className="secondary-content">14%</a></div></li>
                                <li className="collection-item"><div>Children Below 5<a href="#!" className="secondary-content">0.113%</a></div></li>
                            </ul>
                        </div>
                        <div className="col l4 content">
                            <ul className="collection with-header">
                                <li className="collection-header"><h5>Top Counties</h5></li>
                                <li className="collection-item"><div>Nairobi<a href="#!" className="secondary-content">679</a></div></li>
                                <li className="collection-item"><div>Mombasa<a href="#!" className="secondary-content">500</a></div></li>
                                <li className="collection-item"><div>Kisumu<a href="#!" className="secondary-content">342</a></div></li>
                                <li className="collection-item"><div>Nakuru<a href="#!" className="secondary-content">102</a></div></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>)
    }

    refreshData = () => {
        this.setState({ loading: true });
        this.fetchData();
    }

    async fetchData() {
        await axios.get(`${process.env.REACT_APP_API}/api/summary-statistics`, {
            headers: { Authorization: "Bearer " + localStorage.getItem('token') }
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
        this.setState({
            page_loaded: true
        }, this.getData);
    }
}

function Enlisted(props) {
    return <li className="collection-item">
            <div>{props.text}<a href="#!" 
            className="secondary-content">
                <span class={`new badge ${props.color}`} 
                data-badge-caption="">{props.scalar}</span></a>
            </div>
        </li>
}

export default Dashboard;