import React from "react";
import {useParams} from "react-router-dom";

export default function Member(props) {
    let { id } = useParams();
    return <div>{id}</div>
}