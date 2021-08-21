const fs = require('fs');
const util = require('util');

const promisifyReadFile = util.promisify(fs.readFile);
const promisifyWriteFile = util.promisify(fs.writeFile);
const promisifyAppendFile = util.promisify(fs.appendFile);

module.exports = {
    promisifyReadFile,
    promisifyWriteFile,
    promisifyAppendFile
};