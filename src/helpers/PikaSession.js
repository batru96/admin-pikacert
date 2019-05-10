module.exports = {
    setAdminToken: setAdminToken,
    getAdminToken: getAdminToken,
};


function setAdminToken(token) {
    localStorage.setItem('token', token);
}

function getAdminToken() {
    return localStorage.getItem('token');
}
