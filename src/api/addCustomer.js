import apis from './apis';
import axios from 'axios';

const addCustomer = (inputs) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url: apis.ADD_CUSTOMER,
            data: inputs
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

export default addCustomer;
