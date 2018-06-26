var express = require("express");
var Zombie = require("./models/zombie");
var equipamiento = require("./models/addeqip");

var passport = require("passport");
var router = express.Router();

router.use((req, res, next) => {
    res.locals.currentZombie = req.zombie;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

router.get("/", (req, res, next) => {
    Zombie.find()
        .sort({ createdAt: "descending" })
        .exec((err, zombies) => {
            if (err) {
                return next(err);
            }
            res.render("index", { zombies: zombies });
        });

});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    Zombie.findOne({ username: username }, (err, zombie) => {
        if (err) {
            return (err);
        }
        if (zombie) {
            req.flash("error", "El nombre de usuario ya lo ha tomado otro zombie");
            return res.redirect("/signup");
        }
        var newZombie = new Zombie({
            username: username,
            password: password
        });
        newZombie.save(next);
        return res.redirect("/");
    });
});

/*router.get("/index2", (req, res) => {
    res.render("index2");
});*/
router.get("/index2", (req, res) => {
    equipamiento.find()
        .exec((err, equipment) => {
            if (err) {
                return next(err);
            }
            res.render("index2", { equipment: equipment });
        });
});

router.get("/equipment", (req, res) => {
    res.render("equipment");
});

router.post("/equipment", (req, res, next) => {
    var description = req.body.description;
    var defense = req.body.defense;
    var weight = req.body.weight;
    var category = req.body.category;

    var newEquip = new equipment({
        description: description,
        defense: defense,
        weight: weight,
        category: category
    });
    newEquip.save(next);
    return res.redirect("/index2");
});

router.get("/addeqip", (req, res, next) => {
    equipamiento.find()
        .exec((err, equipment) => {
            if (err) {
                return next(err);
            }
            res.render("addeqip", { equipment: equipment });
        });


});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/zombies/:username", (req, res, next) => {
    Zombie.findOne({ username: req.params.username }, (err, zombie) => {
        if (err) {
            return next(err);
        }
        if (!zombie) {
            return (404);
        }
        res.render("profile", { zombie: zombie });
    });
});
router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

/*router.get("/edit", ensureAuthenticated, (req, res) => {

})
*/
module.exports = router;