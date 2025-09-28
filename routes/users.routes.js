const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../model/users.model");
const usersModel = require("../model/users.model");
const passport = require("passport");
const router = express.Router();


router.get("/register", (req, res) => {
    res.status(200).render("register", { title: "Register" });
});

router.post("/register", async (req, res) => {
    try {

        const { username, email, password } = req.body;
        const existingUser = await Users.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({
                message: "user already exist"
            })
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = new Users({ username, email, password: hash });
        await newUser.save();
        res.status(201).redirect("/login");

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.get("/logout", (req, res) => {
    res.status(200).redirect("/");
});

router.get("/login", (req, res) => {
    res.status(200).render("login", { title: "Login" });
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/profile"
}));

router.get("/profile", (req, res) => {
    res.status(200).render("profile", { title: "Profile" })
})

module.exports = router;