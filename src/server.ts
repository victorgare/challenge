// this shim is required
import { createExpressServer } from "routing-controllers";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";

dotenv.config();

// creates express app, registers all controller routes and returns you express app instance
const server = createExpressServer({
  controllers: [__dirname + "/controllers/*.ts"],
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// run express application on port 3000
server.listen(3000);
