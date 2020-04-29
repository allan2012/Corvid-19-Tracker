import React from "react";

export default function PaymentRow(props) {
    return <tr key={props.id}>
        <td>{props.date}</td>
        <td>{props.amount}</td>
        <td>{props.transaction_id}</td>
        <td>{props.property_id}</td>
        <td>{props.channel}</td>
        <td></td>
    </tr>
}