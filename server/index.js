require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const subscriptionHandler = require("./subscriptionHandler");

var port = process.env.PORT || 4000;

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post(
  "/subscription",
  subscriptionHandler.handlePushNotificationSubscription
);
app.get("/subscription/:id", subscriptionHandler.sendPushNotification);

app.listen(port);
console.log("The magic happens on port" + port);
