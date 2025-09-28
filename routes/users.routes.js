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

const checkedLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/profile");
    }
    next();
}

router.get("/login", checkedLoggedIn, (req, res) => {
    res.status(200).render("login", { title: "Login" });
});

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        successRedirect: "/profile"
    }));

const checkedAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(200).redirect("/login");
}

router.get("/profile", checkedAuthenticated, (req, res) => {
    res.status(200).render("profile", { title: "Profile" });
});

router.get("/logout", (req, res, next) => {
    try {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.status(200).redirect("/");
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;