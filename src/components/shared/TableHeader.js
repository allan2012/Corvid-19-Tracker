import React from 'react'

const TableHeader = (props) => {

    let items = props.column_titles.map(item => 
        <th>{item}</th>
    )

    return <thead>
        <tr>
            {items}
        </tr>
    </thead>
}

export default TableHeader