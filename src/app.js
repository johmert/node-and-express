const express = require("express");
const app = express();

// middleware function
const sayHello = (req, res, next) => {
    //when called, respond with "Hello!"
    res.send("Hello!");
};

const morgan = require("morgan");

app.use(morgan("dev"));
//creates a path to "/hello" that runs the sayHello middleware function
app.get("/hello", sayHello);


module.exports = app;