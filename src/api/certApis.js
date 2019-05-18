import axios from 'axios';
import { APIS } from '../helpers/constants';
import { getAdminToken } from '../helpers/PikaSession';

export const getCerts = () => axios({
    method: 'GET',
    url: APIS.GET_CERTS,
    headers: { Authorization: getAdminToken() }
}).then(res => res.data);
