const fs = require('fs').promises;
const path = require('path');

const pathToDB = path.join(__dirname, '../', 'dataBase', 'users.json');

const getUsersFromDB = async () => {
    const users = await fs.readFile(pathToDB);
    return JSON.parse(users.toString());
};

const saveUsersToDB = async (users) => {
    const usersStringify = JSON.stringify(users);
    await fs.writeFile(pathToDB, usersStringify);
};

module.exports = {
    getUsersFromDB,
    saveUsersToDB
};
