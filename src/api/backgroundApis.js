import axios from 'axios';
import { APIS } from '../helpers/constants';
import { getAdminToken } from '../helpers/PikaSession';

export const getBackgrounds = () => axios({
    method: "GET",
    url: APIS.GET_BACKGROUNDS,
}).then(res => res.data);

export const addBackground = data => axios({
    method: "POST",
    url: APIS.ADD_BACKGROUND,
    headers: {
        Authorization: getAdminToken(),
        "Content-Type": "multipart/form-data"
    },
    data: data
}).then(res => res.data);
