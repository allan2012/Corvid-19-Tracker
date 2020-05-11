import React from 'react';

class Logout extends React.Component {
    componentDidMount() {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        this.props.history.push('/')
    }

    render() {
        return <p>Logout</p>
    }
}

export default Logout;
