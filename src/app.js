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

const sayGoodbye = (req, res) => {
    res.send("Sorry to see you go!");
}

const saySomething = (req, res) => {
    //params set in url like :greeting
    const greeting = req.params.greeting;
    const name = req.query.name;
    const content = greeting && name ?  `${greeting}, ${name}!` : `${greeting}!`;
    res.send(content);
};

const checkForAbbreviationLength = (req, res, next) => {
    const abbreviation = req.params.abbreviation;
    if (abbreviation.length !== 2) {
      next(`State abbreviation ${abbreviation} is invalid.`);
    } else {
      next();
    }
  };

const morgan = require("morgan");

app.use(morgan("dev"));
//creates a path to "/hello" that runs the sayHello middleware function
app.get("/hello", sayHello);
//order matters - if route has multiple paths, make sure to order accordingly
app.get("/say/goodbye", sayGoodbye);
//creates a path to "/say/:greeting" that runs saySomething
// go to localhost:8080/say/hello?name=world to see "hello, world!"
app.get("/say/:greeting", saySomething);
//state route to cause some errors
app.get(
    "/states/:abbreviation", 
    checkForAbbreviationLength, 
    (req, res, next) => {
        res.send(`${req.params.abbreviation} is a nice state, I'd like to visit.`);
    }
);
//travel route to practice router-level middleware
app.get(
    "/travel/:abbreviation", 
    checkForAbbreviationLength,
    (req, res, next) => {
        res.send(`Enjoy your trip to ${req.params.abbreviation}!`);
    }
);
//Not-Found handler
app.use((req, res, next) => {
    res.send(`the route ${req.path} does not exist`);
});
//Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.send(err);
});


module.exports = app;