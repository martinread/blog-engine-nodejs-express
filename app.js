// setup express js
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

// setup handlebars & default layout
var handlebars = require('express-handlebars');
app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var fs = require('fs');

// route handler for the homepage
app.get('/', function (req, res) {

    fs.readFile(__dirname + "/lorem-ipsum-articles.json", function (err, data) {
        var articles = JSON.parse(data);

        var data = {
            articles: articles
        }

        res.render('homepage', data);
    });

});

// make all files in the public folder (& subfolders) accessible
app.use(express.static(__dirname + '/public'));

// 404 page
app.use(function (req, res) {
    res.type('text/html');
    res.status(404);
    res.send('Page not found :( <a href="/">Click here</a> to return to the homepage.');
});

// 500 page
app.use(function (req, res) {
    res.type('text/html');
    res.status(500);
    res.send("500 Internal Server Error :(. <a href="/">Click here</a> to return to the homepage.");
});

// start the server running on port 3000.
app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port'));
});