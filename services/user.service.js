const fs = require('fs').promises;
const path = require('path');

const { dataToJson } = require('../utils');

const pathToDB = path.join(__dirname, '../', 'db', 'users.json');

module.exports = {
    getUsersFromDB: async () => {
        const users = await fs.readFile(pathToDB);
        return dataToJson(users);
    },
    setUsersToDB: async (users) => {
        const usersStringify = JSON.stringify(users);
        await fs.writeFile(pathToDB, usersStringify);
    }
};
