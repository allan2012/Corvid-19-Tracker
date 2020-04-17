import React from 'react';
import axios from 'axios';

class Login extends React.Component {

    state = {
        username: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    authenticate = (event) => {
        event.preventDefault();
        this.auth()
    }

    auth = () => {
        axios.post(`http://localhost/jwt/`, this.state)
            .then(response => {
                if (response.data.status === 'success') {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('refresh_token', response.data.refresh_token)
                    this.props.history.push('/dashboard')
                } else {
                    alert("Login failed")
                }
            }).catch(error => {
                console.log(error)
        })
    }

    render() {
        return (
            <div>
                <form>
                    <input type="text"
                           value={this.state.username}
                           name="username"
                           onChange={this.handleChange} /> <br />
                    <input type="password"
                           value={this.state.password}
                           name="password"
                           onChange={this.handleChange}/> <br />
                    <button onClick={this.authenticate}>Login</button>
                </form>
            </div>
        )
    }
}

export default Login;