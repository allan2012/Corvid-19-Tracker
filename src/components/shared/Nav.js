import React from "react";
import {Link} from "react-router-dom";

export function Nav(){
    return <nav>
            <ul>
                <li><Link to="/">Login</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/tenants">Tenants</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </nav>
}