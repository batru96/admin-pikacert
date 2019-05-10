import React, { Component } from 'react';
import Header from '../components/Header/index';
import { Link, Route } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
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
        console.log(this.props.match.url)
    }

    render() {
        const { user } = this.state;
        const { match } = this.props;
        return (
            <div>
                <Header username={user.username} />
                <h1>Body</h1>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to={`/about/`}>About</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>
                <Route path='/' component={() => <h3>HOME</h3>} />
                <Route path='/about/' component={() => <h3>About</h3>} />
                <Route path='/topics/' component={() => <h3>Topics</h3>} />
            </div>
        );
    }
}
