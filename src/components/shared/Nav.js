import React from "react";
import {Link} from "react-router-dom";
import M from 'materialize-css';
import MaterialIcon from '../shared/MaterialIcon'

class Nav extends React.Component {

    componentDidMount() {
        M.AutoInit();
    }

    render() {
        return (<header>
            <ul id="slide-out" className="sidenav sidenav-fixed left-menu">
                <li className="center logo-holder">
                    <h5 className='logo-text'>Corvid-19</h5>
                </li>
                <li><Link to="/dashboard"><i className="material-icons">pie_chart_outlined</i>Dashboard</Link></li>
                <li><Link to="/corvid-patients"><i className="material-icons">hotel</i>Corvid-19 Patients</Link></li>
                <li><Link to="/quarantined"><i className="material-icons">portrait</i>Quarantined</Link></li>
                <li><Link to="/centers"><i className="material-icons">apartment</i>Centers</Link></li>
                <li><a href="#!"><i className="material-icons">people</i>System Users</a></li>
                <li><a href="#!"><i className="material-icons">folder_open</i>Reports</a></li>
            </ul>
            <ul id="dropdown1" className="dropdown-content">
                <li><a href="#modal1" className="modal-trigger">
                    <i className="material-icons">person_outline</i> Profile</a></li>
                <li><a href="#!"><i className="material-icons">settings</i> Settings</a></li>
                <li className="divider"></li>
                <li><Link to="/logout"><i className="material-icons">exit_to_app</i> Logout</Link></li>
            </ul>
            <nav className="blue darken-4">
                <div className="nav-wrapper">
                    <span className='page-title'>{this.props.page_title}</span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="sass.html">Help</a></li>
                        <li><a href="badges.html">FAQ</a></li>
                        <li><a className="dropdown-trigger" href="#!" data-target="dropdown1">Welcome {localStorage.getItem('names')}<i
                            className="material-icons right">arrow_drop_down</i></a></li>
                    </ul>
                </div>
            </nav>

            <div id="modal1" className="modal" style={{width: '400px'}}>
                <div className="modal-content">
                    <h5>{localStorage.getItem('names')}</h5>
                    <p>
                        <MaterialIcon icon="email" size="tiny" /> allan.koskei@gmail.com
                    </p>
                    <p>
                        <MaterialIcon icon="phone" size="tiny" />+254711900788
                    </p>
                    <p>
                        <MaterialIcon icon="perm_contact_calendar" size="tiny" /> Date registered: 14th May 2020
                    </p>
                    <p>
                        <MaterialIcon icon="account_circle" size="tiny" /> Role: Data Clerk
                    </p>
                    
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Close</a>
                </div>
            </div>
        </header>)
    }
}

export default Nav;
