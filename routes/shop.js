const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("layouts/main-layout");
});

module.exports = router;
