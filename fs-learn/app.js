const fs = require('fs');
const path = require('path');


// __dirname - це шлях корінної папки в якій ми запускаємо файл
// path - бібліотека яка будує шляхи


//Цей метод створює нову директорію, а {recursive: true} просто запускає рекурсію і створює папки з кінця path

const newDirPath = path.join(__dirname, 'testDirection');
//
fs.mkdir(newDirPath, {recursive: true}, err => {
    if (err) {
        console.log(err);
    }
});

// Цей метод читає директорію
fs.readdir(newDirPath, (err, files) => {
});

// Цим методом можна перевірити чи це папка чи файл

const fileDirectory = path.join(newDirPath, 'john.json');
fs.stat(fileDirectory, (err, stats) => {
    stats.isDirectory();
    stats.isFile();
});

//Метод яким можна щось записати (перезаписати) в файл

const userJson = JSON.stringify({name: "Yurii", age: 18});

fs.writeFile(fileDirectory, userJson, err => {
    if (err) {
        console.log(err);
    }
});

//Метод яким можна щось дописати в файл

fs.appendFile(fileDirectory, userJson, err => {
    if (err) {
        console.log(err);
    }
});

//Зчитати файл

fs.readFile(fileDirectory, (err, data) => {
    data.toString()
});

//Видалити директорію (Але її можна видалити тільки коли вона пуста в інакшому випадку потрібно перше видалити файли в ній)
fs.rmdir(newDirPath, (err => {
}));


//Видалити файл
fs.unlink(fileDirectory, err => {
});



