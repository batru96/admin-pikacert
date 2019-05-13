const rootURL = 'https://test.pikacert.com';
const apis = {
    LOGIN: rootURL + '/Administrator/Login',
    LOGIN_BY_TOKEN: rootURL + '/Administrator/LoginByToken',
    GET_CUSTOMERS: rootURL + '/Customer',
    DELETE_CUSTOMER: rootURL + '/Customer',
    ADD_CUSTOMER: rootURL + '/Customer/SignUp'
}

export default apis;
