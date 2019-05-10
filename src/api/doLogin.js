import apis from './apis';
import axios from 'axios';

const doLogin = (inputs, handler) => {
    const { username, password } = inputs;

    axios({
        method: 'POST',
        url: apis.LOGIN,
        data: {
            username: username,
            password: password
        }
    }).then(res => {
        if (res.data.error) {
            handler({ error: res.data.message });
        } else {
            handler(res.data);
        }
    }).catch(error => {
        handler({ error: 'Network error' });
    });
}

export default doLogin;
