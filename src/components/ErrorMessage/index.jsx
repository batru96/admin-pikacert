import React, { Component } from 'react';

class ErrorMessage extends Component {
    render() {
        const { error } = this.props;
        return <h6 className="error-message" style={{ display: error === null ? 'none' : 'block' }}>{error}</h6>;
    }
}

export default ErrorMessage;
