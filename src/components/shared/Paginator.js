import React from "react";

export default function Paginator(props)
{
    return <ul className="pagination">
        <li className="disabled">
            <button 
                className="waves-effect waves-teal btn-flat" 
                onClick={()=>props.fetchPage('BACK')}>
                <i className="material-icons">
                    chevron_left
                </i>
            </button>
        </li>
        <li className="btn-flat">
            <a href="#!">
                {props.current_page}
            </a>
        </li>
        <li className="waves-effect">
            <button 
                className="waves-effect waves-teal btn-flat" 
                onClick={()=>props.fetchPage('NEXT')}>
                <i className="material-icons">
                    chevron_right
                </i>
            </button>
        </li>
    </ul>
}
