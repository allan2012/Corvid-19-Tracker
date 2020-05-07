import React from 'react';
import axios from 'axios';
import Loader from "./shared/Loader";
import Nav from "./shared/Nav";
import PeopleFilter from "./shared/PeopleFilter";
import Paginator from "./shared/Paginator";
import FloatingButton from "./shared/FloatingButton";
import PageSummaries from "./shared/PageSummaries";

class Centers extends React.Component
{
    state = {
        members: [],
        first_page_url: null,
        prev_page_url: null,
        next_page_url: null,
        last_page_url: null,
        total: 0,
        loader: true,
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
                this.setState({
                    members: response.data.data,
                    loader: false,
                    first_page_url: response.data.first_page_url,
                    prev_page_url: response.data.prev_page_url,
                    last_page_url: response.data.last_page_url,
                    next_page_url: response.data.next_page_url,
                    total: response.data.total,
                    current_page: response.data.current_page
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

    async componentDidMount() {
        await this.getData();
    }


    render() {
        let loader = this.state.loader;
        let loader_animation = (loader === true) ? <Loader/> : "";
        let items = this.state.members.map((item, key) =>
            <DataColumn item={item}/>
        );

        return <div>
            <Nav/>
            <main>
                <div className="row">
                    <PageSummaries />
                    <PeopleFilter />
                </div>
                <div className="row content">
                    <div className="col l12">
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
            <th>Description</th>
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
        <td>{props.item.description}</td>
        <td>
            <button className="waves-effect waves-teal btn-flat">
                <i className="material-icons left">remove_red_eye</i>
            </button>
        </td>
    </tr>
}

export default Centers;