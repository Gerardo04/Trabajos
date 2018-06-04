var express = require("express");

var api = express.Router();

api.get("/users", (req, res) => {
    res.send("<h1>Esñtpy en API -users </h1>");
});

api.get("/numeros/:min/:max", (req, res) => {
    var min = parseInt(req.params.min);
    var max = parseInt(req.params.max);

    if (isNaN(min) || isNaN(max)) {
        res.status(400);
        res.set("Content-Type", "text/html");

        res.send("<h1>Bad request!!</h1>")
        return;
    }
    var result = Math.round((Math.random() * (max - min)) + min);
    res.set("Cpntent-type", "text/html");
    res.send("<h1>Esta API es mas chida :)</h1> <h2>El numero aleatorio es:" + result + "</h2>");
});

module.exports = api;