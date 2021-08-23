const fs = require('fs').promises;
const path = require('path');

const { dataToJson } = require('../utils');

const pathToDB = path.join(__dirname, '../', 'db', 'users.json');

module.exports = {
    getUsersFromDB: async () => {
        const users = await fs.readFile(pathToDB);

        return dataToJson(users);
    },
    getUserById: async (userId) => {
        const data = await fs.readFile(pathToDB);
        const users = dataToJson(data);

        const currentUser = users.find((user) => user.userId === +userId);
        return currentUser;
    },

    findUserByEmail: async (email) => {
        const data = await fs.readFile(pathToDB);
        const users = dataToJson(data);

        const currentUser = users.find((user) => user.email === email);
        return currentUser;
    },

    saveUserToDB: async (email, password) => {
        const data = await fs.readFile(pathToDB);
        const usersJson = dataToJson(data);

        const lastUserId = usersJson.length > 0 ? usersJson.pop().userId : 0;

        const createdUser = {
            userId: lastUserId + 1,
            email,
            password
        };

        usersJson.push(createdUser);

        await fs.writeFile(pathToDB, JSON.stringify(usersJson));

        return usersJson;
    },

    deleteUserFromDB: async (userId) => {
        const data = await fs.readFile(pathToDB);
        const users = dataToJson(data);

        const filteredUsers = users.filter((user) => user.userId !== +userId);

        await fs.writeFile(pathToDB, JSON.stringify(filteredUsers));

        return filteredUsers;
    },

    updateUserFromDB: async (userId, body) => {
        const data = await fs.readFile(pathToDB);
        const users = dataToJson(data);

        const updatedUsers = users.map((user) => {
            if (user.userId === +userId) {
                return { ...user, ...body };
            }

            return user;
        });

        await fs.writeFile(pathToDB, JSON.stringify(updatedUsers));

        return updatedUsers;
    }
};
