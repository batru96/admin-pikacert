import { APIS } from '../helpers/constants';
import axios from 'axios';
import { getAdminToken } from '../helpers/PikaSession';

export const getCustomers = () => axios({
    method: 'GET',
    url: APIS.GET_CUSTOMERS,
    headers: { Authorization: getAdminToken() }
}).then(res => res.data);

export const addCustomer = customer => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: APIS.ADD_CUSTOMER,
            data: customer
        }).then(res => {
            if (res.data.error) {
                reject(res.data.message);
            } else {
                resolve(res.data)
            }
        }).catch(error => {
            reject(error);
        });
    });
}

export const deleteCustomer = id => {
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
