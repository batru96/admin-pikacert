const doLogin = (inputs, handler) => {
    const { email, password } = inputs;

    setTimeout(() => {
        if (email == 'admin@gmail.com' && password == '123456') return handler({});
        handler({ error: 'Invalid username or password' });
    }, 5000);
}

export default doLogin;
