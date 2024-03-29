var express = require('express');
var fortune = require('./lib/fortune')

var app = express();
var handlebars = require('express3-handlebars')
        .create({ defaultLayout: 'main' });


app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 8000);

app.use(function (req, res, next) {
        res.locals.showTests = app.get('env') !== 'production' &&
                req.query.test === '1';
        next();
});

app.get('/', function (req, res) {
        res.render('home')
});

app.get('/about', function (req, res) {
        res.render('about', { fortune: fortune.getFortune() })
});

// custom 404 page

app.use(function (req, res) {
        res.status(404);
        res.render('404')
})

// custom 500 page

app.use(function (err, req, res, next) {
        res.status(500);
        res.render('500')
});

app.listen(app.get('port'), function () {
        console.log(app.get('port'))
});
