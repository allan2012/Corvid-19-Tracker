import React from 'react';
import axios from 'axios';
import isAuthenticated from './shared/Auth'
import Loader from "./shared/Loader";
import {AppContext} from './AppContext'

class Report extends React.Component {

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
                    <div className="col l12 content dashboard-summary">
                        <div className="col l6 content">
                            <iframe src="https://ourworldindata.org/grapher/full-list-total-tests-for-covid-19?time=2020-03-06..&country=KEN" 
                                style={{width: '100%', height: '400px', border: '0px none'}} />

                            <iframe 
                                src="https://ourworldindata.org/grapher/daily-deaths-covid-19?time=2020-03-14..&country=KEN" 
                                style={{width: '100%', height: '600px', border: '0px none'}} />
                        </div>
                        <div className="col l6 content">
                        <iframe 
                            src="https://ourworldindata.org/grapher/daily-cases-covid-19?time=2020-03-14..&country=KEN" 
                            style={{width: '100%', height: '400px', border: '0px none'}} />
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    async componentDidMount() {
        if (false === isAuthenticated()) {
            this.props.history.push('/')
        }

        this.context.updateAppBarTitle('Curated reports')
        this.setState({...this.state, page_loaded: true});
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

export default Report;
