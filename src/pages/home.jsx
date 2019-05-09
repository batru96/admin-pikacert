import React, { Component } from 'react';

class Home extends Component {

    componentDidMount() {
        console.log('@@@@');
        if (localStorage.getItem('token') == null) {
            // window.location.href = '/login';
        }
    }

    render() {
        return(
            <h1>Home View</h1>
        );
    }
}

export default Home;
