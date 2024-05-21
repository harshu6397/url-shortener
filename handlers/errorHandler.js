const errorMessages = require("../constants/errorMessages.json");
const { StatusCodes } = require("http-status-codes");

class NotFoundError extends Error {
    constructor(message = errorMessages.NOT_FOUND) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

class BadRequestError extends Error {
    constructor(message = errorMessages.BAD_REQUEST) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

class UnAuthorizedError extends Error {
    constructor(message = errorMessages.UNAUTHORIZED) {
        super(message);
        this.name = "UnAuthorizedErrro";
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

class InternalServerError extends Error {
    constructor(message = errorMessages.INTERNAL_SERVER_ERROR) {
        super(message);
        this.name = "InternalServerError";
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
}

module.exports = {NotFoundError, BadRequestError, UnAuthorizedError, InternalServerError}