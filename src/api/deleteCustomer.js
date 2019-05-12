import apis from './apis';
import axios from 'axios';
import { getAdminToken } from '../helpers/PikaSession';

const deleteCustomer = (id) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'DELETE',
            url: apis.DELETE_CUSTOMER,
            headers: { Authorization: getAdminToken() },
            data: { id }
        }).then(res => {
            resolve(res.data);
        }).catch(error => reject(error));
    });
}

export default deleteCustomer;
