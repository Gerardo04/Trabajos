var express = require("express");
var app = express();

var api = require("./routes/api");

app.use("/api", api);

app.get("/", (req, res) => {
    res.send("<h1>Pagina principal!!!</h1>");
});

app.listen(3000, () => {
    console.log("La aplicacion esta corriendo por el puerto 3000")
});