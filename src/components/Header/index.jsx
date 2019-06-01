import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Authentication from '../../helpers/authentication';


const Header = withRouter(
    ({ history }) =>
        Authentication.isLoggedIn ? (
            <div className="header-bar">
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
                <button onClick={() => {
                    Authentication.logout();
                    history.push('/');
                }}>Sign out</button>
            </div>
        ) : null
);

export default Header;
