"use strict";
exports.__esModule = true;
// this shim is required
var routing_controllers_1 = require("routing-controllers");
var dotenv_1 = require("dotenv");
var express_1 = require("express");
dotenv_1["default"].config();
var app = express_1["default"]();
// creates express app, registers all controller routes and returns you express app instance
routing_controllers_1.useExpressServer(app, {
    controllers: [__dirname + "/controllers/*.js"]
});
// run express application on port 3000
app.listen(3000);
