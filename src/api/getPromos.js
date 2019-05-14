import { APIS } from '../helpers/constants';
import { getAdminToken } from '../helpers/PikaSession';
import axios from 'axios';

const getPromos = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: APIS.GET_PROMOES,
            headers: { Authorization: getAdminToken() }
        }).then(res => resolve(res.data))
            .catch(error => reject(error));
    });
}

export default getPromos;
