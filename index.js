require("dotenv").config();
require("./db");
const express = require("express");
const cors = require("cors");
const routers = require('./router/router');
const errorInformer = require("./middleware/errorInformer");
const {success} = require('./handlers/responseHandler')
const successMessages = require('./constants/successMessages.json')

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

app.get("/", (_, res) => {
    return success(res, successMessages.WELCOME, null)
});

routers.forEach(({ version, router }) => {
    app.use(`/api/${version}`, router);
});

app.use(errorInformer)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
