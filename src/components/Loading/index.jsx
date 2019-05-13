import React, { Component } from 'react';
import spinner from '../../images/animations/spinner.gif'

class Loading extends Component {
    render() {
        return (
            <div style={{
                textAlign: 'center',
                display: this.props.visible ? 'block' : 'none'
            }}>
                <img src={spinner} alt="Loading indicator" />
            </div>
        );
    }
}

export default Loading;
