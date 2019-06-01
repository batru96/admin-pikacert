import React, { Component } from 'react';
import Authentication from '../../helpers/authentication';
import { Route, Redirect } from 'react-router-dom';

export default class index extends Component {
    state = {}
    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    Authentication.isLoggedIn ? (<Component {...props} />) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        );
    }
}
