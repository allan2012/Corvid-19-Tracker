import React from 'react';
import axios from 'axios';
import isAuthenticated from './shared/Auth'
import Loader from "./shared/Loader";
import { XYPlot, LineSeries, XAxis, YAxis } from 'react-vis';
import { AppContext } from './AppContext'

class Dashboard extends React.Component {

    state = {
        data: {},
        page_loaded: false
    };

    static contextType = AppContext;

    render() {
        let { page_loaded } = this.state;

        if (page_loaded === false) {
            return <Loader />
        }


        return (<main>
            <div className="row content">
                <div className="col l12">
                    <h5>Curated Corvid-19 Data</h5>
                    <iframe
                        frameBorder="0"
                        src="https://ourworldindata.org/grapher/total-cases-covid-19?tab=map"
                        width="100%"
                        height="500px"
                    />
                </div>
                <div className="col l12 content dashboard-summary">
                    <div className="col l4 content">
                        <ul className="collection with-header">
                            <li className="collection-header">
                                <h5>Infected Count Summary</h5>
                            </li>
                            <Enlisted text='Cofirmed' color='red' scalar='334' />
                            <Enlisted text='Recovered' scalar='856' />
                            <Enlisted text='Tracked' scalar='7,856' />
                            <Enlisted text='Critical' scalar='63' />
                        </ul>
                    </div>
                    <div className="col l4 content">
                        <ul className="collection with-header">
                            <li className="collection-header">
                                <h5>Infected Demographics</h5>
                            </li>
                            <Enlisted text="Female" scalar='34%' />
                            <Enlisted text="Male" scalar='66%' />
                            <Enlisted text="60 and above" scalar='14%' />
                            <Enlisted text="Children below 5" scalar='0.113%' />
                        </ul>
                    </div>
                    <div className="col l4 content">
                        <ul className="collection with-header">
                            <li className="collection-header">
                                <h5>Top Counties</h5>
                            </li>
                            <Enlisted text="Nairobi" scalar={679} />
                            <Enlisted text="Mombasa" scalar={500} />
                            <Enlisted text="Kisumu" scalar={342} />
                            <Enlisted text="Nakuru" scalar={102} />
                        </ul>
                    </div>
                </div>
            </div>
        </main>
        )
    }

    refreshData = () => {
        this.setState({ loading: true });
        this.fetchData();
    }

    async fetchData() {
        await axios.get(`${process.env.REACT_APP_API}/api/summary-statistics`, {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem('token')
            }
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

        this.context.updateAppBarTitle('Dashboard')
        await this.fetchData();
        this.setState({
            page_loaded: true
        }, this.getData);
    }
}

const Enlisted = (props) => {
    return <li className="collection-item">
        <div>{props.text}<a href="#!"
            className="secondary-content">
            {props.scalar}
        </a>
        </div>
    </li>
}

export default Dashboard;
