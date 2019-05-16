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
    GET_CREDITS: rootURL + '/Credit',
    ADD_CREDIT: rootURL + '/Credit',
    DELETE_CREDIT: rootURL + '/Credit',
};

export const MAX_ROW = 10;