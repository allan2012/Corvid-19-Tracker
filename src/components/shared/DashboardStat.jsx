import React from "react";
import CircularLoader from "./CircularLoader";
import MaterialIcon from "./MaterialIcon";

export default function DashboardStat(props) {
    return <div className="col l3">
        <div className="card-panel hoverable">
            <MaterialIcon 
                size="large dashboard-material-icon" 
                icon={props.icon} 
            />
            <h6>{
                (props.scalar === undefined) 
                ? <CircularLoader/> 
                : props.scalar.toLocaleString()
            } {props.title}</h6>
        </div>
    </div>
}