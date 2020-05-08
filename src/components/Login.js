import React from 'react';
import axios from 'axios';
import Loader from "./shared/Loader";
import '../Login.css';
import M from 'materialize-css';
import jwt_decode from 'jwt-decode';

class Login extends React.Component {

    state = {
        email: '',
        password: '',
        loading: false
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    authenticate = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        if (this.state.username === '') {
            M.toast({html: 'Invalid username', classes: 'rounded, red'});
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
                    M.toast({html: 'Login failed. Please try again', classes: 'rounded, red'});
                    this.setState({loading: false})
                }
            }).catch(error => {
                console.log(error)
            })
    }

    render() {
        let loading = this.state.loading;
        let progress = '';

        if (loading === true) {
            progress = <Loader/>
        }
        return (
            <div>
                <div className="container login">
                    <div className="row">
                        <div className="col l4  offset-l4 card-panel hoverable">
                            {progress}
                            <div className="login-wrapper">
                                <form className="col s12">
                                    < div className="row">
                                        <div className="col s12 center">
                                            <img src='./virus.png' className="logo-icon"/>
                                            <h5> Corvid - 19Tracker </h5>
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
                                            <button className="waves-effect waves-light btn blue darken-4"
                                                    onClick={this.authenticate}>Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;