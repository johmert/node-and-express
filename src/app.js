const express = require("express");
const app = express();

// middleware function
const sayHello = (req, res, next) => {
    //when called, respond with "Hello!"
    res.send("Hello!");
};

// middleware function
const logging = (req, res, next) => {
    // log it
    console.log("A request is being made!");
    // after function body, move on to next middleware function
    next();
};

app.use(logging);
app.use(sayHello);


module.exports = app;