import React, { Component } from 'react';
import spinner from '../../images/animations/spinner.gif'

class Loading extends Component {
    render() {
        return (this.props.visible ? <img src={spinner} alt="Loading indicator" /> : null);
    }
}

export default Loading;
