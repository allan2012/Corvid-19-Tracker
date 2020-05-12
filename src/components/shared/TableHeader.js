import React from 'react'

const TableHeader = (props) => {

    let items = props.column_titles.map((item,key) =>
        <th key={key}>{item}</th>
    )

    return <thead>
        <tr>
            {items}
        </tr>
    </thead>
}

export default TableHeader
