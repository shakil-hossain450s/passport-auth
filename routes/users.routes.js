const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => {
    res.status(200).render("register", {title: "Register"})
})

module.exports = router;