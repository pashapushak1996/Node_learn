const fs = require('fs');
const path = require('path');
const until = require('util');

const promisifyReadFile = until.promisify(fs.readFile);


const pathToGirls = path.join(__dirname, '18_00');
const pathToBoys = path.join(__dirname, '20_00');


const replaceFileByGender = (oldFilePath, name, gender) => {
    const fileNameWithExtension = `${ name.toLowerCase() }.json`;
    switch (gender) {
        case 'male': {
            const newPathForBoy = path.join(pathToBoys, fileNameWithExtension);
            fs.rename(oldFilePath, newPathForBoy, err => {
                console.log(err);
            });
            break;
        }
        case 'female': {
            const newPathForGirl = path.join(pathToGirls, fileNameWithExtension);
            fs.rename(oldFilePath, newPathForGirl, err => {
                console.log(err);
            });
        }
    }
}


const fileReplacer = (pathsArray) => {
    pathsArray.forEach((pathToDir) => {
        fs.readdir(pathToDir, (err, files) => {
            if (err) {
                console.log(err);
                return;
            }
            files.forEach(async file => {
                const filePath = path.join(pathToDir, file);
                const buffer = await promisifyReadFile(filePath);
                const bufferString = buffer.toString();
                const {name, gender} = JSON.parse(bufferString);
                replaceFileByGender(filePath, name, gender);
            });
        });
    });
};


fileReplacer([pathToGirls, pathToBoys]);
