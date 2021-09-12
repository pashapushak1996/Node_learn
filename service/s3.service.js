const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid').v1;

const {
    variables
} = require('../config');

const bucket = new S3({
    region: variables.AWS_S3_REGION,
    accessKeyId: variables.AWS_S3_ACCESS_KEY,
    secretAccessKey: variables.AWS_S3_SECRET_KEY
});

module.exports = {
    uploadFile: (file, itemType, itemId) => {
        const { data, mimetype, name } = file;

        const fileName = _fileNameBuilder(name, itemType, itemId);

        return bucket
            .upload({
                Bucket: variables.AWS_S3_NAME,
                Body: data,
                Key: fileName,
                ContentType: mimetype
            })
            .promise();
    }
};

function _fileNameBuilder(fileName, itemType, itemId) {
    const fileExtension = path.extname(fileName);

    return `${itemType}/${itemId}/${uuid()}${fileExtension}`;
}
