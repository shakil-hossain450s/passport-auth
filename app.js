const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/users.routes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.status(200).render("index", {title: "Home"});
});
app.use("/", usersRouter);

module.exports = app;