const express = require("express");
const Users = require("../model/users.model");
const router = express.Router();

router.get("/register", (req, res) => {
    res.status(200).render("register", {title: "Register"});
});

router.post("/register", async(req, res) => {
    try{

        const {username, email, password} = req.body;
        const existingUser = await Users.findOne({email: email});
        if(existingUser){
            return res.status(409).json({
                message: "user already exist"
            })
        }
        const newUser = new Users({username, email, password});
        await newUser.save();
        res.status(201).json({
            message: "User Created Successfully",
            newUser
        });

    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router;