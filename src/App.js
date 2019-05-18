import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWindowClose, faTimesCircle, faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { getAdminToken } from './helpers/PikaSession';
import checkToken from './api/checkToken';
import Login from './pages/login';
import Home from './pages/home';
import Loading from './components/Loading/index';
import './App.css';

library.add(faWindowClose, faTimesCircle, faPenSquare);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLogin: false
    };
    this.loginSuccess = this.loginSuccess.bind(this);
  }

  componentWillMount() {
      checkToken(getAdminToken(), error => {
        if (error == null) {
          this.setState({
            isLogin: true,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
  }

  loginSuccess() {
    this.setState({
      isLogin: true
    });
  }

  render() {
    const { isLoading, isLogin } = this.state;
    return (
      <div className="App">
        {isLoading ? <Loading visible={true} /> : isLogin ?
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/login/" exact component={() => <Redirect to={{ pathname: '/' }} />} />
          </Router> :
          <Router>
            <Route path="/" component={props => <Login {...props} loginSuccess={this.loginSuccess} />} />
          </Router>}
      </div>
    );
  }
}

export default App;
