module.exports = {
    userDataNormalizator: (userObj) => {
        const fields = [
            'password',
            '__v'
        ];

        fields.forEach((field) => {
            delete userObj[field];
        });

        return userObj;
    },
};