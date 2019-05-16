import { APIS } from '../helpers/constants';
import axios from 'axios';
import { getAdminToken } from '../helpers/PikaSession';

export const getCredits = () => new Promise((resolve, reject) => {
    axios({
        method: 'GET',
        url: APIS.GET_CREDITS,
        headers: { Authorization: getAdminToken() },
    })
        .then(res => resolve(res.data))
        .catch(error => reject(error));
});


