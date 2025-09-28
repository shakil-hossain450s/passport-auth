const express = require("express");
const Users = require("../model/users.model");
const usersModel = require("../model/users.model");
const router = express.Router();

router.get("/register", (req, res) => {
    res.status(200).render("register", { title: "Register" });
});

router.post("/register", async (req, res) => {
    try {

        const { username, email, password } = req.body;
        const existingUser = await Users.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({
                message: "user already exist"
            })
        }
        const newUser = new Users({ username, email, password });
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

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;