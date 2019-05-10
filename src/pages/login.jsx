import React, { Component } from 'react';
import { setAdminToken } from '../helpers/PikaSession';
import FormHeader from '../components/FormHeader/index';
import TextInput from '../components/TextInput/index';
import FormButton from '../components/FormButton/index';
import doLogin from '../api/doLogin';
import spinner from '../images/animations/spinner.gif';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            loading: false
        };
        this.login = this.login.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    FieldInputs = [
        { id: 'username', name: 'Username', type: 'text', isRequired: true },
        { id: 'password', name: 'Password', type: 'password', isRequired: true }
    ]

    login(event) {
        this.setState({
            error: '',
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
            setAdminToken(response.token);
            this.props.loginSuccess();
        }
    }

    render() {
        const { error, loading } = this.state;
        return (
            <div>
                <form className="login-form" onSubmit={this.login}>
                    <FormHeader title="PikaCert Admin Panel" />
                    <div className="form-body">
                        {this.FieldInputs.map(item => <TextInput key={item.id} item={item} target={this} />)}
                        <FormButton target={this} />
                    </div>
                    {loading && <img src={spinner} alt="Loading indicator" />}
                    <div className="loading-indicator"></div>
                    {error.length > 0 && <h5 onClick={() => this.setState({ error: '' })} style={{ color: 'red', padding: 10, textAlign: 'center' }}>{error}</h5>}
                </form>
            </div>
        );
    }
}

export default Login;
