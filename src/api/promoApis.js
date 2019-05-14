import { APIS } from '../helpers/constants';
import { getAdminToken } from '../helpers/PikaSession';
import axios from 'axios';

export const getPromos = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: APIS.GET_PROMOES,
            headers: { Authorization: getAdminToken() }
        }).then(res => resolve(res.data))
            .catch(error => reject(error));
    });
}

export const addPromo = promo => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            headers: { Authorization: getAdminToken() },
            url: APIS.ADD_PROMO,
            data: promo
        }).then(res => {
            if (res.data.error) {
                reject(res.data.message);
            } else {
                resolve(res.data);
            }
        }).catch(error => {
            reject(error);
        });
    });
}

export const deletePromo = id => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'DELETE',
            url: APIS.DELETE_PROMO,
            headers: { Authorization: getAdminToken() },
            data: { id }
        }).then(res => resolve(res.data))
            .catch(error => reject(error));
    });
}
