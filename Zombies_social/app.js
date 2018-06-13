var express = require("express");
var mongoose = require("mongoose");

var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");

var routers = require("./routes");
var app = express();

mongoose.connect("mongodb://localhost:27017/zombie_nest");
app.set("port", process.env.PORT || 3000);

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "marioeltiolocodelasalcanatrillas",
    resave: true,
    saveUninitialized: true
}));

app.use(flash());
app.use(routers);

app.listen(app.get("port"), () => {
    console.log("La aplicacion se esta corriendo en  el puerto " + app.get("port"));
});