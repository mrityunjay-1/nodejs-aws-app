const express = require("express");
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const HomepageRouter = require('./routers/HomepageRouter');

const server = express();

server.use(express.json());

// this line is being used for looking the public directory where all the things (css, js, images) located
// & - setup static directory to serve
server.use(express.static(path.join(__dirname, "../public")));

server.set("view engine", "hbs");
server.set('views', path.join(__dirname, "../public/templates/views"));
hbs.registerPartials(path.join(__dirname, "../public/templates/partials"));




// using body-parser
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// express-session
server.use(expressSession({
    secret: "I am secret",
    key: "Hello I am key",
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 9999999
    }
}))


// cookieParser
server.use(cookieParser());


// routers
server.use(HomepageRouter);

server.listen(process.env.PORT, () => {
    console.log("server is up on port:" + process.env.PORT);
})