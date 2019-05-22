import axios from 'axios';
import { APIS } from '../helpers/constants';
import { getAdminToken } from '../helpers/PikaSession';

export const getConfig = () => axios({
    method: "GET",
    url: APIS.GET_CONFIG,
    headers: { Authorization: getAdminToken() },
}).then(res => res.data);

export const changeCredit = (credit) => axios({
    method: "PATCH",
    url: APIS.CHANGE_DEFAULT_CREDIT,
    headers: { Authorization: getAdminToken() },
    data: { credit }
}).then(res => res.data);

export const changePricing = pricing => axios({
    method: "PATCH",
    url: APIS.CHANGE_DEFAULT_PRICING,
    headers: { Authorization: getAdminToken() },
    data: pricing
}).then(res => res.data);
