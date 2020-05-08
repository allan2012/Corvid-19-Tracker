import React from 'react';
import axios from 'axios';
import Loader from "./shared/Loader";
import Nav from "./shared/Nav";
import PeopleFilter from "./shared/PeopleFilter";
import Paginator from "./shared/Paginator";
import FloatingButton from "./shared/FloatingButton";
import PageSummaries from "./shared/PageSummaries";
import MaterialIcon from './shared/MaterialIcon';

class Centers extends React.Component
{
    state = {
        data: [],
        first_page_url: null,
        prev_page_url: null,
        next_page_url: null,
        last_page_url: null,
        total: 0,
        loader: true,
        page_loaded: false,
        path: `${process.env.REACT_APP_API}/api/centers`,
        current_page: 1,
    };

    constructor(props) {
        super(props);
    }

    async getData() {
        this.setState({loader: true});
        await axios.get(this.state.path,
            {headers : {Authorization: "Bearer " + localStorage.getItem('token')}})
            .then(response => {
                let data = response.data;
                this.setState({
                    data: data.data,
                    loader: false,
                    first_page_url: data.first_page_url,
                    prev_page_url: data.prev_page_url,
                    last_page_url: data.last_page_url,
                    next_page_url: data.next_page_url,
                    total: data.total,
                    current_page: data.current_page
                });
            });
    }

    fetchPage = pointers => {
        if (pointers === 'NEXT' && this.state.current_page <= this.state.total) {
            this.setState({
                path: this.state.next_page_url
            }, this.getData);
        }

        if (pointers === 'BACK' && this.state.current_page !== 1) {
            this.setState({
                path: this.state.prev_page_url
            }, this.getData);
        }
    }

    async componentDidMount()
    {
        await this.getData();
        this.setState({
            page_loaded: true
        })
    }


    render()
    {
        let {page_loaded,data} = this.state
        let items = data.map((item, key) =>
            <DataColumn item={item}/>
        );

        if (page_loaded === false) {
            return <Loader />
        }

        return <div>
            <Nav page_title='Approved Qurantine Centers'/>
            <main>
                <div className="row">
                    <PeopleFilter />
                </div>
                <div className="row">
                    <div className="col l5">
                        <TableGrid items={items} />
                        <Paginator
                            fetchPage={this.fetchPage}
                            current_page={this.state.current_page}
                        />
                    </div>
                </div>
            </main>
            <FloatingButton/>
        </div>
    }
}

function TableGrid(props)
{
    return <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Location</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
            {props.items}
        </tbody>
    </table>
}

function DataColumn(props)
{
    return <tr key={props.item.id}>
        <td>{props.item.name}</td>
        <td>{props.item.location}</td>
        <td>
            <button className="waves-effect waves-teal btn-flat">
                <MaterialIcon icon="remove_red_eye"/>
            </button>
        </td>
    </tr>
}

export default Centers;