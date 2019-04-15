

const doLogin = (inputs, handler) => {
    const { username, password } = inputs;
    setTimeout(() => {
        if (username == 'admin' && password == '123456') return handler({});
        handler({ error: 'Invalid username or password' });
    }, 5000);
}

export default doLogin;
