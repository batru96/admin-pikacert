import React, { Component } from 'react';

class FormButton extends Component {
    render() {
        return (
            <button className="form-button" onClick={this.props.target.login}>SIGN IN</button>
        );
    }
}

export default FormButton;
