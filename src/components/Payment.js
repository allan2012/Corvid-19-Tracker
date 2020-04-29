import React from 'react';
import Nav from "./shared/Nav";
import PaymentRow from "./shared/PaymentRow";

class Payment extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        payments: [
            {
                id:1,
                date: "2020-04-05 13:22",
                amount: "23,500",
                transaction_id: "798G7687",
                property_id: 55,
                channel: 'M-Pesa'
            },
            {
                id:2,
                date: "2020-04-06 13:00",
                amount: "73,500",
                transaction_id: "GY767876",
                property_id: 23,
                channel: 'M-Pesa'
            }
        ]
    }


    render() {
        const items = this.state.payments.map((item, key) =>
            <PaymentRow
                id={item.id}
                date={item.date}
                amount={item.date}
                transaction_id={item.transaction_id}
                property_id={item.property_id}
                channel={item.channel}
            />
        );
        return <div>
            <Nav/>
            <div className="container">
                <div className="row">
                    <div className="col l11 offset-l1">
                        <div className="col l12">
                            <h5>Payments</h5>
                            <table>
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Transaction ID</th>
                                    <th>Property ID</th>
                                    <th>Channel</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {items}
                                </tbody>
                            </table>
                            <ul className="pagination">
                                <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                                <li className="active"><a href="#!">1</a></li>
                                <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Payment;