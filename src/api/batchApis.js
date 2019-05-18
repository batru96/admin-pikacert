import axios from 'axios';
import { APIS } from '../helpers/constants';
import { getAdminToken } from '../helpers/PikaSession';

export const getBatches = () => axios({
    method: 'GET',
    url: APIS.GET_BATCHES,
    headers: { Authorization: getAdminToken() }
}).then(res => res.data);
