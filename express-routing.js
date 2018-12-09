var fs = require('fs');
var auth = require('./authentication.js');

module.exports = function (app) {

    // route handler for the homepage
    app.get('/', function (req, res) {

        var username = null;

        if (req.isAuthenticated()) {
            username = req.user.username;
        }

        fs.readFile(__dirname + "/lorem-ipsum-articles.json", function (err, data) {
            var articles = JSON.parse(data);

            var data = {
                articles: articles,
                loginSuccess: req.query.loginSuccess,
                loginFail: req.query.loginFail,
                username: username
            }

            res.render('homepage', data);
        });

    });

    app.get('/login', function (req, res) {
        if (req.isAuthenticated()) {
            res.redirect("/");
        }
    });

    app.post('/login', auth.passport.authenticate('local', {

    successRedirect: '/?loginSuccess=true',
    failureRedirect: '/?loginFail=true'
    }));

}