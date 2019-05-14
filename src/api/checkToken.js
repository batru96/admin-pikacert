import { APIS } from '../helpers/constants';
import axios from 'axios';
import { setAdminToken } from '../helpers/PikaSession';

const checkToken = (token, handler) => {
    axios({
        method: 'GET',
        url: APIS.LOGIN_BY_TOKEN,
        headers: { Authorization: token }
    }).then(res => {
        if (res.data.error) {
            handler({ error: res.data.message });
        } else {
            setAdminToken(res.data.token);
            handler();
        }
    }).catch(error => handler({ error: 'Network failed' }));
}

export default checkToken;