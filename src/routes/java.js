var express = require("express");
var router = express.Router();

var javaController = require("../controllers/javaController");

router.post("/loginJava", function (req, res) {
    javaController.loginJava(req, res);
});

router.post("/logout", function (req, res) {
    javaController.logout(req, res);
});

module.exports = router;