require("dotenv").config();
const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/users.routes");

const session = require("express-session");
const passport = require("passport");
const MongoStore = require('connect-mongo');

require("./config/passport");


const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.set("trust proxy", 1);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions"
    })
    // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
    res.status(200).render("index", { title: "Home" });
});
app.use("/", usersRouter);

module.exports = app;