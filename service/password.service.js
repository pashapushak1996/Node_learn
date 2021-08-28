const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: (hash, password) => bcrypt.compare(password, hash)
};
