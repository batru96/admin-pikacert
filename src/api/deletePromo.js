import { APIS } from '../helpers/constants';
import { getAdminToken } from '../helpers/PikaSession';
import axios from 'axios';

const deletePromo = (id) => {
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

export default deletePromo;
