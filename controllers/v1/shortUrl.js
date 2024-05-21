const Shorturl = require("../../models/shorturl");
const shortUrlController = {};

shortUrlController.createShortUrl = async (req, res) => {
    try {
        const { full } = req.body;
        await Shorturl.create({ full });
        return res.status(200).json({
            status: true,
            message: "Short Url is created successfully!",
            data: null,
        });
    } catch (error) {
        console.log("Error in creating short url: ", Error);
    }
};

shortUrlController.getAllShortUrls = async (_, res) => {
    try {
        const urls = await Shorturl.find().select("-__v ");
        return res.status(200).json({
            status: true,
            message: "Short Url is created successfully!",
            data: urls,
        });
    } catch (error) {
        console.log("Error during getting the short urls: ", error);
    }
};

shortUrlController.getOriginalUrl = async (req, res) => {
    try {
        const { url } = req.params;
        if (!url && url === "") {
            console.log("I'm here");
            return res.status(400).json({
                status: true,
                message: "Enter a valid url!",
                data: null,
            });
        }
        console.log("Url: ", url);
        const fullUrl = await Shorturl.findOne({ short: url }).select("-__v");
        if (!fullUrl) {
            console.log("I'm not here", fullUrl);
            return res.status(400).json({
                status: true,
                message: "Enter a valid url!",
                data: null,
            });
        }

        fullUrl.clicks += 1;
        fullUrl.save();

        return res.status(200).json({
            status: true,
            message: "Short Url is found successfully!",
            data: fullUrl,
        });
    } catch (error) {
        console.log("Error during resolving into full url: ", error);
    }
};

module.exports = shortUrlController;
