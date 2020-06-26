import React, { Component } from 'react';
import { Link } from "react-router-dom";
import store from 'store'

import axios from 'axios';

import './register.css'


class SignUpForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        // get form data out of state
        //const { name, password, email } = this.state;

        const {history} = this.props;

        console.log('On submit pressed');

        /*
        fetch('http://localhost:5000/api/v1/chatup/auth/register', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        */
        axios.post('http://' + window.location.hostname +':'+window.location.port+'/api/v1/chatup/auth/register',this.state)
            .then((info) => { 
                console.log(info);
                if (info.data.success === true) {
                    console.log("Hello");
                    store.set('loggedIn', true);
                    store.set('state',this.state);
                    history.push('/chat');
                }
             })

    }

    render() {
        return (
            <div className="FormCenter">
                <form onSubmit={this.handleSubmit} className="FormFields box">
                    <h1>Register</h1>
                    <div className="FormField">
                        <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name" value={this.state.name} onChange={this.handleChange} />
                    </div>
                    <div className="FormField">
                        <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="FormField">
                        <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div className="FormField">
                        <button className="FormField__Button mr-20">Sign Up</button>
                        <Link to={`/`} >
                            <h6>Login</h6>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUpForm;