var dao = require('./database-queries.js');

var passport = require('passport');
module.exports.passport = passport;
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
        dao.getCredentials( {username: username, password: password }, function (user) {
            // if username/password combination not found in the db
            if (!user) {
                return done(null, false, { message: 'Invalid username or password' });
            };
            // login validated
            return done(null, user);
        });
    }
));

// save authenticated user's username in a session
passport.serializeUser(function (user, done) {
    done(null, user.username);
});
// get all data related to the user with the given username
passport.deserializeUser(function (username, done) {
    dao.getUserInfo(username, function (user) {
        done(null, user);
    });
});

module.exports.initialize = function (app) {
    // Start up Passport, and tell it to use sessions to store necessary data.
    app.use(passport.initialize());
    app.use(passport.session());
};
