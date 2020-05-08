import React from "react";

export default function MaterialIcon(props) {
    return <i 
        className={`material-icons ${props.size}`}>
            {props.icon}
        </i>
}