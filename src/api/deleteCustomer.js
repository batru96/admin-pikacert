import { APIS } from '../helpers/constants';
import axios from 'axios';
import { getAdminToken } from '../helpers/PikaSession';

const deleteCustomer = (id) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'DELETE',
            url: APIS.DELETE_CUSTOMER,
            headers: { Authorization: getAdminToken() },
            data: { id }
        }).then(res => {
            resolve(res.data);
        }).catch(error => reject(error));
    });
}

export default deleteCustomer;
