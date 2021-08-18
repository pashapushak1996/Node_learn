// - у вас є масив юзрів (до 10), з такими полями наприклад - const users = [
//     { name: 'olya', gender: 'female', age: 20 }
//         ...
// ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера (наприклад - Olya.txt),
// вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// перед тим створити 4 папки - наприклад - manOlder20, manYounger20, womanOlder20, womanYounger20
// і розподілити ваших юзерів саме по відповідних папках

const fs = require('fs');
const path = require('path');


const users = [
    {name: "Olya", gender: "female", age: 21},
    {name: "Valya", gender: "female", age: 22},
    {name: "Natasha", gender: "female", age: 23},
    {name: "Lena", gender: "female", age: 14},
    {name: "Ulya", gender: "female", age: 15},
    {name: "Vasya", gender: "male", age: 21},
    {name: "Petya", gender: "male", age: 22},
    {name: "Sasha", gender: "male", age: 23},
    {name: "Seryu", gender: "male", age: 14},
    {name: "Vitalik", gender: "male", age: 15}
];

const pathToManOlder20 = path.join(__dirname, 'manOlder20');
const pathToManYounger20 = path.join(__dirname, 'manYounger20');
const pathToWomanOlder20 = path.join(__dirname, 'womanOlder20');
const pathToWomanYounger20 = path.join(__dirname, 'womanYounger20');

const createPathByAge = ({name, gender, age}, fileExtension) => {
    const manOlder20 = age > 20 && gender === 'male';
    const manYounger20 = age <= 20 && gender === 'male';
    const womanOlder20 = age > 20 && gender === 'female';
    const womanYounger20 = age <= 20 && gender === 'female';

    if (manOlder20) {
        return path.join(pathToManOlder20, `${ name }.${ fileExtension }`);
    }
    if (manYounger20) {
        return path.join(pathToManYounger20, `${ name }.${ fileExtension }`);
    }
    if (womanOlder20) {
        return path.join(pathToWomanOlder20, `${ name }.${ fileExtension }`);
    }
    if (womanYounger20) {
        return path.join(pathToWomanYounger20, `${ name }.${ fileExtension }`);
    }
}

const createUserFile = (array) => {
    array.forEach((user) => {
        const userObj = JSON.stringify(user);
        fs.writeFile(createPathByAge(user, 'json'), userObj, err => {
            if (err) {
                console.log(err);
            }
        });
    });
};

createUserFile(users);
