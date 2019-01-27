var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// set 'showTests' context property if the querystring contains test=1
app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});

app.get('/', function(req, res) {
    res.render('home');
});
app.get('/contact', function(req,res){
    res.render('contact', {fortune: fortune.getFortune() } );
});
app.get('/about', function(req,res){
    res.render('about', {fortune: fortune.getFortune() } );
});
app.get('/tours/hood-river', function(req, res){
    res.render('tours/hood-river');
});
app.get('/tours/oregon-coast', function(req, res){
    res.render('tours/oregon-coast');
});
app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
});

// express route to explain headers.

app.get('/headers', function(req,res){
    res.set('Content-Type', 'text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s)
});
app.get('/error', function(req,res){
    res.status(500);
    res.render('error');
});
// passing a context to a view including querystring cookie and session clues.
app.get('/greeting', function(req, res){
    res.render('about', {
        message: 'welcome',
        style: req.query.style,
        userid: req.cookie.userid,
        username: req.session.username,
    });
    app.get('/test', function(req, res){
            res.type('text/plain');
            res.send('This is a test');
    });
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

// This should appear AFTER all of your routes

app.use(function(req,res){
    res.status(404).render('not-found');
});

// Adding an error handler
// This should appear after all your routes.
// add soon here

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
});
