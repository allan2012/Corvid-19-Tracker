import React from 'react';
import axios from 'axios';
import Loader from "./shared/Loader";
import '../Login.css';
import M from 'materialize-css';
import jwt_decode from 'jwt-decode';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

class Login extends React.Component {

    state = {
        email: '',
        password: '',
        loading: false,
        error: ''
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    authenticate = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        if (this.state.email === '') {
            this.setState({ error: 'Invalid email'})
        } else {
            this.auth()
        }
    }

    async auth() {
        await axios.post(`${process.env.REACT_APP_API}/api/auth`, this.state)
            .then(response => {
                if (response.data.status === 'success') {
                    let decoded = jwt_decode(response.data.token);
                    localStorage.setItem('names', decoded.user_data.names)
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('refresh_token', response.data.refresh_token)
                    this.props.history.push('/dashboard')
                } else {
                    this.setState({ loading: false, error: 'Login failed. Please try again' })
                }
            }).catch(error => {
                console.log(error)
            })
    }

    render() {
        let loading = this.state.loading;
        let progress = '';
        let error = (this.state.error !== '') ? 
             <Alert severity="error">{this.state.error}</Alert> 
             : this.state.error;

        if (loading === true) {
            progress = <Loader />
        }
        return (<div className="container login">
                    <div className="row">
                        <div className="col l4  offset-l4 card-panel hoverable">
                            {progress}
                            <div className="login-wrapper">
                                <form className="col s12">
                                    < div className="row">
                                        <div className="col s12 center">
                                            <img src='./virus.png'
                                                 alt="app logo"
                                                 className="logo-icon"
                                            />
                                            <h5> Corvid - 19Tracker </h5>
                                            {error}
                                        </div>
                                        <div className="input-field col s12">
                                            <input name="email"
                                                placeholder="Email"
                                                value={this.state.email}
                                                onChange={this.handleChange} />
                                        </div>
                                        <div className="input-field col s12">
                                            <input type="password"
                                                placeholder="Password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s12">
                                            <Button 
                                                onClick={this.authenticate} 
                                                variant="contained" 
                                                color="primary">Login</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Login;
