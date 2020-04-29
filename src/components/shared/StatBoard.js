import React from "react";

export function StartBoard(props) {
    return <div className="col-3">
            <div className="card statboard-placer">
                <i className="material-icons">{props.icon}</i>
                <h5>{props.header}</h5>
                <p>{props.text}</p>
            </div>
        </div>
}