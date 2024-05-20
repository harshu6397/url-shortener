require("dotenv").config();
require("./db");
const express = require("express");
const Shorturl = require("./models/shorturl");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8888;

// middlewares
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

app.get("/", (req, res) => {
    return res.json({
        status: true,
        message: "Yo, this is url shortener server 🚀",
        data: null,
    });
});

app.post("/shortUrl", async (req, res) => {
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
});

app.get("/getAllShortUrls", async (req, res) => {
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
});

app.get("/:url", async (req, res) => {
    try {
        const { url } = req.params;
        if (!url && url === ""){
            console.log("I'm here")
            return res.status(400).json({
                status: true,
                message: "Enter a valid url!",
                data: null,
            });
        }
        console.log("Url: ", url);
        const fullUrl = await Shorturl.findOne({short: url}).select('-__v')
        if (!fullUrl){
            console.log("I'm not here", fullUrl)
            return res.status(400).json({
                status: true,
                message: "Enter a valid url!",
                data: null,
            });
        }

        fullUrl.clicks += 1
        fullUrl.save()

        return res.status(200).json({
            status: true,
            message: "Short Url is found successfully!",
            data: fullUrl,
        });
    } catch (error) {
        console.log("Error during resolving into full url: ", error);
    }
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
