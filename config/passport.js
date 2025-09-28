const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Users = require("../model/users.model");

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await Users.findOne({ username: username });

            if (!user) {
                return done(null, false, { message: "Invalid User" });
            }

            if (!bcrypt.compare(password, user.password)) {
                return done(null, false, { message: "Invalid Password" });
            }

            return done(null, user);

        } catch (err) {
            return done(err);
        }
    }
    ));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Users.findById({ _id: id });
        done(null, user);
    } catch (err) {
        done(err, false);
    }
})