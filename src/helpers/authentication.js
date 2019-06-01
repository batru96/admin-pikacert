const authen = {
    isLoggedIn: false,
    loginSuccess() {
        this.isLoggedIn = true;
    },
    logout() {
        this.isLoggedIn = false;
        localStorage.removeItem('token');
    }
};

export default authen;
