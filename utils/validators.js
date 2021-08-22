const userDataValidator = (email, password) => {
    const domains = [
        'com',
        'org',
        'edu',
        'gov',
        'net'
    ];
    const domain = email.split('.').pop();

    const isValidEmail = domains.includes(domain) && email.includes('@');
    const isValidPassword = password.length > 0;
    if (!isValidEmail || !isValidPassword) {
        return null;
    }

    return true;
};

module.exports = {
    userDataValidator
};
