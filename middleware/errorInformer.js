const { error } = require("../handlers/responseHandler");

const errorInformer = async (err, req, res, next) => {
    console.error("err.stack", err.stack);
    error(res, err.message);
};

module.exports = errorInformer;
