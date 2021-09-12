const { fileProperties, statusCodeEnum } = require('../constant');
const { ErrorHandler, errorMessageEnum } = require('../error');

const { MIMETYPES, MAX_SIZES } = fileProperties;

module.exports = {
    checkAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { size, mimetype } = req.files.avatar;

            if (!MIMETYPES.PHOTO.includes(mimetype)) {
                throw new ErrorHandler(statusCodeEnum.BAD_REQUEST, errorMessageEnum.FILE_EXTENSION_ERR);
            }

            if (size > MAX_SIZES.PHOTO) {
                throw new ErrorHandler(statusCodeEnum.BAD_REQUEST, errorMessageEnum.LARGE_FILE_ERR);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
