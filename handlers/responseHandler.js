const { StatusCodes } = require("http-status-codes");

const responseHandler = {};

responseHandler.success = (
    res,
    message = "Success",
    data = null,
    code = StatusCodes.OK,
    success = true,
) => {
    res.status(code).json({
        status: success,
        message,
        data,
    });
};

responseHandler.error = (
    res,
    message = "Error",
    data = null,
    code = StatusCodes.INTERNAL_SERVER_ERROR,
    success = false,
) => {
    res.status(code).json({
        status: success,
        message,
        data,
    });
};

module.exports = responseHandler;
