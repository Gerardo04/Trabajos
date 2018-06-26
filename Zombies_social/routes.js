var express = require("express");
var Zombie = require("./models/zombie");
var Equip = require("./models/equipment");

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

router.get("/equip", (req, res, next) => {
    Equip.find()

    .exec((err, equipment) => {
        if (err) {
            return next(err);
        }
        res.render("equip", { equipment: equipment });
    });

});
router.get("/Requip", (req, res) => {
    res.render("Requip");
});
router.post("/Requip", (req, res, next) => {
    var description = req.body.description;
    var defense = req.body.defense;

    Equip.findOne({ description: description }, (err, equip) => {
        if (err) {
            return (err);
        }
        if (equip) {
            req.flash("error", "El nombre de usuario ya lo ha tomado otro zombie");
            return res.redirect("/Requip");
        }
        var newEquip = new Equip({
            description: description,
            defense: defense
        });
        newEquip.save(next);
        return res.redirect("/equip");
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
router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

/*router.get("/edit", ensureAuthenticated, (req, res) => {
})
*/
module.exports = router;