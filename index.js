require("dotenv").config();
require("./db");
const express = require("express");
const Shorturl = require("./models/shorturl");
const cors = require("cors");
const routers = require('./router/router')

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

routers.forEach(({ version, router }) => {
    app.use(`/api/${version}`, router);
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
