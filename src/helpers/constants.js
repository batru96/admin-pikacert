// const rootURL = 'http://localhost:1336';
const rootURL = 'https://test.pikacert.com';
export const APIS = {
    LOGIN: rootURL + '/Administrator/Login',
    LOGIN_BY_TOKEN: rootURL + '/Administrator/LoginByToken',
    GET_CUSTOMERS: rootURL + '/Customer',
    DELETE_CUSTOMER: rootURL + '/Customer',
    ADD_CUSTOMER: rootURL + '/Customer/SignUp',
    GET_PROMOES: rootURL + '/Promo',
    ADD_PROMO: rootURL + '/Promo',
    DELETE_PROMO: rootURL + '/Promo',
    UPDATE_PROMO: rootURL + '/Promo',
    GET_CREDITS: rootURL + '/Credit',
    ADD_CREDIT: rootURL + '/Credit',
    DELETE_CREDIT: rootURL + '/Credit',
    GET_CERTS: rootURL + '/Certificate',
    GET_BATCHES: rootURL + '/Batch',
    GET_BACKGROUNDS: rootURL + '/Background',
    ADD_BACKGROUND: rootURL + '/Background',
    REMOVE_BACKGROUND: rootURL + '/Background',
    UPLOAD_BACKGROUND_DATA: rootURL + '/Background/UploadImageData',
    GET_CONFIG: rootURL + '/Config',
    CHANGE_DEFAULT_CREDIT: rootURL + '/Config/Credit',
    CHANGE_DEFAULT_PRICING: rootURL + '/Config/Pricing',
};

export const MAX_ROW = 10;