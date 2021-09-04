module.exports = {
    dataNormalizator: (userObj) => {
        const fields = ['password'];

        fields.forEach((field) => {
            delete userObj[field];
        });

        return userObj;
    }
};
