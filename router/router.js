const express = require("express");
const { V1 } = require("../constants/constants.json").VERSIONS;
const routers = [];

const routes = [
    {
        route: "/shortUrl",
        method: "POST",
        version: [V1],
        controller: "shortUrl",
        callback: "createShortUrl",
    },
    {
        route: "/getAllShortUrls",
        method: "GET",
        version: [V1],
        controller: "shortUrl",
        callback: "getAllShortUrls",
    },
    {
        route: "/getLongUrl/:url",
        method: "GET",
        version: [V1],
        controller: "shortUrl",
        callback: "getOriginalUrl",
    },
    {
        route: "/updateCustomUrl",
        method: "PATCH",
        version: [V1],
        controller: "shortUrl",
        callback: "updateCustonUrl",
    },
];

// Function to dynamically import controller based on its name
const getController = (controllerName, version) => {
    return require(`../controllers/${version}/${controllerName}.js`);
};

// Iterate through routes and create router instances for each version
routes.forEach(
    ({ route, method, version, controller, callback, middleware }) => {
        version &&
            version.forEach((v) => {
                // Find or create router instance for this version
                let router = routers.find((r) => r.version === v);
                if (!router) {
                    router = { version: v, router: express.Router() };
                    routers.push(router);
                }
                // Dynamically import the controller function based on version
                const controllerFunction = getController(controller, v);

                // Dynamically define route for this version
                const routeHandler =
                    middleware && middleware.length > 0
                        ? [...middleware, controllerFunction[callback]]
                        : controllerFunction[callback];

                // Dynamically define route for this version on the router instance
                router.router[method.toLowerCase()](route, routeHandler);
            });
    }
);

module.exports = routers;
