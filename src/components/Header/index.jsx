import React, { Component } from 'react';

class Header extends Component {
    render() {
        const { username } = this.props;
        return (
            <div className="header-bar">
                <span className="admin-name">{username}</span>
            </div>
        );
    }
}

export default Header;
