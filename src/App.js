import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWindowClose, faTimesCircle, faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { getAdminToken } from './helpers/PikaSession';
import checkToken from './api/checkToken';
import Login from './pages/login';
import Home from './pages/home';
import Loading from './components/Loading/index';
import About from './pages/About';
import './App.css';
import Authentication from './helpers/authentication';
import Header from './components/Header';

library.add(faWindowClose, faTimesCircle, faPenSquare);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentWillMount() {
    checkToken(getAdminToken(), error => {
      if (error == null) {
        Authentication.loginSuccess();
      }
      this.setState({
        isLoading: false
      });
    });
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <Loading visible={true} />
    return (
      <div className="App">
        <Router>
          <Header />
          <Route path="/login/" exact component={Login} />
          <PrivateRoute path="/about" exact component={About} />
          <PrivateRoute path="/" exact component={Home} />
        </Router>
      </div>
    );
  }
}

const AuthButton = withRouter(
  ({ history }) =>
    Authentication.isLoggedIn ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            Authentication.logout();
            history.push('/');
          }}
        >
          Sign out
        </button>
      </p>
    ) : null
);


export default App;
