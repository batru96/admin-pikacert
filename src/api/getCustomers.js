import { APIS } from '../helpers/constants';
import axios from 'axios';
import { getAdminToken } from '../helpers/PikaSession';

const getCustomers = (handler) => {
    axios({
        method: 'GET',
        url: APIS.GET_CUSTOMERS,
        headers: { Authorization: getAdminToken() }
    }).then(res => {
        handler(res.data);
    }).catch(error => {
        // console.log(error);
        handler({ error: 'Network error' });
    });
}

export default getCustomers;
