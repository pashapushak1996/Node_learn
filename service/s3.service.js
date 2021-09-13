const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid').v1;

const {
    variables: {
        AWS
    }
} = require('../config');

const bucket = new S3({
    region: AWS.S3_REGION,
    accessKeyId: AWS.S3_ACCESS_KEY,
    secretAccessKey: AWS.S3_SECRET_KEY
});

module.exports = {
    uploadFile: (file, itemType, itemId) => {
        const { data, mimetype, name } = file;

        const fileName = _fileNameBuilder(name, itemType, itemId);

        return bucket
            .upload({
                Bucket: AWS.S3_NAME,
                Body: data,
                Key: fileName,
                ContentType: mimetype
            })
            .promise();
    },

    deleteFile: (filePath) => {
        const Key = filePath.split(AWS.AMAZON_AWS_COM).pop();

        return bucket
            .deleteObject({
                Bucket: AWS.S3_NAME,
                Key
            })
            .promise();
    }
};

function _fileNameBuilder(fileName, itemType, itemId) {
    const fileExtension = path.extname(fileName);

    return `${itemType}/${itemId}/${uuid()}${fileExtension}`;
}
