import React, { Component } from 'react';
import { setAdminToken } from '../helpers/PikaSession';
import { Redirect } from 'react-router-dom';
import FormHeader from '../components/FormHeader/index';
import TextInput from '../components/TextInput/index';
import FormButton from '../components/FormButton/index';
import doLogin from '../api/doLogin';
import Loading from '../components/Loading/index';
import ErrorMessage from '../components/ErrorMessage/index';
import Authentication from '../helpers/authentication';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            redirectToReferrer: false
        };
        this.login = this.login.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    FieldInputs = [
        { id: 'username', name: 'Username', type: 'text', value: '', isRequired: true },
        { id: 'password', name: 'Password', type: 'password', value: '', isRequired: true }
    ]

    login(event) {
        this.setState({
            error: null,
            loading: true
        });
        doLogin(this.state.fieldInputsState, this.loginHandler);
        event.preventDefault();
    }

    loginHandler(response) {
        this.setState({ loading: false });
        if (response.error) {
            this.setState({ error: response.error });
        } else {
            Authentication.loginSuccess();
            this.setState({ redirectToReferrer: true });
            setAdminToken(response.token);
            // this.props.loginSuccess();
        }
    }

    componentWillMount() {
        console.log(Authentication.isLoggedIn);
        if (Authentication.isLoggedIn) {
            this.props.history.push('/');
        }
    }

    render() {
        const { error, loading } = this.state;
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;
        if (redirectToReferrer) return <Redirect to={from} />;
        return (
            <div>
                <form className="login-form" onSubmit={this.login}>
                    <FormHeader title="Admin Panel" />
                    <div className="form-body">
                        {this.FieldInputs.map(item => <TextInput key={item.id} item={item} target={this} />)}
                        <FormButton target={this} />
                    </div>
                    <Loading visible={loading} />
                    <ErrorMessage error={error} />
                    <div className="loading-indicator"></div>
                </form>
            </div>
        );
    }
}

export default Login;
