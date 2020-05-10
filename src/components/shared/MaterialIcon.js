import React from "react";

const MaterialIcon = props => {
    return <i 
        className={`material-icons ${props.size}`}>
            {props.icon}
        </i>
}

export default MaterialIcon