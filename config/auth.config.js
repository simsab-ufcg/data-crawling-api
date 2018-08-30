const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    (username, password, cb) => {
        return userModel.findOne({username, password})
                        .then(user => {
                            if (!user) {
                                return cb(null, false, {message: 'Username not found'});
                            }
                            return cb(null, user, {message: 'Logged in sucessfully'});
                        })
                        .catch(err => cb(err));
    }
));