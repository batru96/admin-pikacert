import { APIS } from '../helpers/constants';
import axios from 'axios';
import { getAdminToken } from '../helpers/PikaSession';

export const getCredits = () => axios({
    method: 'GET',
    url: APIS.GET_CREDITS,
    headers: { Authorization: getAdminToken() },
}).then(res => res.data);

export const addCredit = (data) => axios({
    method: "POST",
    url: APIS.ADD_CREDIT,
    headers: { Authorization: getAdminToken() },
    data: data
}).then(res => res.data);

