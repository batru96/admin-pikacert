import React, { Component } from 'react';

class FormHeader extends Component {
    render() {
        return (
            <div className="login-header">
                <span className="login-header-title">{this.props.title}</span>
            </div>
        );
    }
}

export default FormHeader;
