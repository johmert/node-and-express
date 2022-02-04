const express = require("express");
const app = express();

// middleware function
const sayHello = (req, res, next) => {
    //log the request query object
    console.log(req.query);
    const name = req.query.name;
    const content = name ? `Hello, ${name}` : "Hello!";
    //when 'sayHello' is called, respond with content
    res.send(content);
};

const saySomething = (req, res) => {
    //params set in url like :greeting
    const greeting = req.params.greeting;
    const name = req.query.name;
    const content = greeting && name ?  `${greeting}, ${name}!` : `${greeting}!`;
    res.send(content);
};

const morgan = require("morgan");

app.use(morgan("dev"));
//creates a path to "/hello" that runs the sayHello middleware function
app.get("/hello", sayHello);
//creates a path to "/say/:greeting" that runs saySomething
// go to localhost:8080/say/hello?name=world to see "hello, world!"
app.get("/say/:greeting", saySomething);


module.exports = app;