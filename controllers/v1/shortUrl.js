const Shorturl = require("../../models/shorturl");
const { success } = require("../../handlers/responseHandler");
const errorMessages = require('../../constants/errorMessages.json')
const successMessage = require('../../constants/successMessages.json')
const {Bad, BadRequestError} = require('../../handlers/errorHandler');
const { StatusCodes } = require("http-status-codes");
const shortUrlController = {};

shortUrlController.createShortUrl = async (req, res, next) => {
    try {
        const { full } = req.body;
        if (!full) {
            throw new BadRequestError(errorMessages.PROVIDE_ALL_FIELDS)
        }
        
        await Shorturl.create({ full });
        return success(res, successMessage.SHORT_URL_CREATED, null, StatusCodes.CREATED)
    } catch (err) {
        console.log("Error in creating short url: ", err);
        next(err);
    }
};

shortUrlController.getAllShortUrls = async (_, res, next) => {
    try {
        const urls = await Shorturl.find().select("-__v ");
        return success(res, successMessage.SHORT_URL_FETCHED, urls)
    } catch (err) {
        console.log("Error during getting the short urls: ", err);
        next(err)
    }
};

shortUrlController.getOriginalUrl = async (req, res, next) => {
    try {
        const { url } = req.params;
        if (!url && url === "") {
            throw new BadRequestError(errorMessages.NOT_VALID_URL)
        }

        const fullUrl = await Shorturl.findOne({ short: url }).select("-__v");
        if (!fullUrl) {
            throw new BadRequestError(errorMessages.NOT_VALID_URL)
        }

        fullUrl.clicks += 1; 
        fullUrl.save();

        return success(res, successMessage.ORIGINAL_URL_FETCHED, fullUrl)
    } catch (err) {
        console.log("Error during resolving into full url: ", err);
        next(err)
    }
};

shortUrlController.updateCustonUrl = async (req, res, next) => {
    try {
        const { id, customUrl } = req.body;
        if (!id || !customUrl) {
            throw new BadRequestError(errorMessages.PROVIDE_ALL_FIELDS)
        }

        const url = await Shorturl.findOne({ _id: id }).select("-__v");
        console.log(url);
        if (!url) {
            throw new BadRequestError(errorMessages.NOT_VALID_URL)
        }
        url.short = customUrl;
        url.save();

        return success(res, successMessage.SHORT_URL_UPDATED, url)
    } catch (err) {
        console.log("error in shortUrlController.changeCustonUrl: ", err);
        next(err)
    }
};

module.exports = shortUrlController;
