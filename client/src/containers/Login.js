import React, { PropTypes, Component } from 'react';
import reactMixin from 'react-mixin';
import { loginUser } from '../actions/auth';
import { connect } from 'react-redux';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    componentDidMount() {
        const { dispatch, isAuthenticated } = this.props;
    }
 
    handleLogin() {
        loginUser(this.state.email, this.state.password); 
    }

    render () {

        return (
            <div>
                <h2>Login</h2>
                <input type='text' valueLink={this.linkState('email')} />
                <input type='password' valueLink={this.linkState('password')} />
            </div>
            );
    
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.boolean,
}

function mapStateToProps(state) {
    var isAuthenticated = state.auth.isAuthenticated;

    return {
        isAuthenticated
    }
}

export default connect(
mapStateToProps)(Login);
