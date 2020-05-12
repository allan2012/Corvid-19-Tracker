import React from 'react'

const TableRow = (props) => {
    let items = props.column_values.map((item,key) => <td key={key}>{item}</td>)
    return <tr>{items}</tr>
}

export default TableRow
