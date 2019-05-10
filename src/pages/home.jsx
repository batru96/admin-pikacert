import React, { Component } from 'react';
import Header from '../components/Header/index';
import Body from '../components/Body/index';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                user: {
                    username: 'Khoa Hoang',
                    email: 'hoangkhoakngt@gmail.com'
                }
            })
        }, 1000);
    }

    render() {
        const { user } = this.state;
        return (
            <div>
                <Header username={user.username} />
                <Body />
            </div>
        );
    }
}
