import React from "react";
import {Link} from "react-router-dom";
import M from 'materialize-css';

class Nav extends React.Component {

    componentDidMount() {
        M.AutoInit();
    }

    render() {
        return (<header>
            <ul id="slide-out" className="sidenav sidenav-fixed left-menu">
                <li className="center logo-holder">
                    <h4>Corvid19</h4>
                </li>
                <li><Link to="/dashboard"><i className="material-icons">pie_chart_outlined</i>Dashboard</Link></li>
                <li><Link to="/corvid-patients"><i className="material-icons">portrait</i>Corvid19 Patients</Link></li>
                <li><Link to="/quarantined"><i className="material-icons">portrait</i>Quarantined</Link></li>
                <li><Link to="/centers"><i className="material-icons">portrait</i>Centers</Link></li>
                <li><a href="#!"><i className="material-icons">people</i>System Users</a></li>
                <li><a href="#!"><i className="material-icons">people</i>Reports</a></li>
            </ul>
            <ul id="dropdown1" className="dropdown-content">
                <li><a href="#!"><i className="material-icons">person_outline</i> Profile</a></li>
                <li><a href="#!"><i className="material-icons">settings</i> Settings</a></li>
                <li className="divider"></li>
                <li><Link to="/logout"><i className="material-icons">exit_to_app</i> Logout</Link></li>
            </ul>
            <nav className="blue darken-4">
                <div className="nav-wrapper">
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">Welcome Allan<i
                            className="material-icons right">arrow_drop_down</i></a></li>
                    </ul>
                </div>
            </nav>
        </header>)
    }
}

export default Nav;