import React from "react";

export default function Paginator(props)
{
    return <ul className="pagination">
        <li className="disabled">
            <a onClick={()=>props.fetchPage('BACK')}>
                <i className="material-icons">
                    chevron_left
                </i>
            </a>
        </li>
        <li className="active blue button">
            <a href="#!">
                {props.current_page}
            </a>
        </li>
        <li className="waves-effect">
            <a onClick={()=>props.fetchPage('NEXT')}>
                <i className="material-icons">
                    chevron_right
                </i>
            </a>
        </li>
    </ul>
}