// Made By Alex Diker
// This is for education purposes only
// Feel Free to Edit at will

var express = require('express');

var app=express();

// setup handlebars view engine
var handlebars = require('express-handlebars')
    .create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars.engine');
var app = express();

app.set('port', process.env.PORT || 3000);

//add Homepage Route
app.get('/', function(req,res){
    res.type('text/plain');
    res.send('AlexsTravelSite');
});

// Add About Page Route
app.get('about', function(req, res){
    res.type('text/plain');
    res.send('About Alex Travel Site');
});
app.get('/about*', function(req,res){
    res.type('text/plain');
    res.send('About')
    //send content
})
app.get('/about/contact', function(req,res){
    //send content
})
app.get('/about/directions', function(req,res){
// send content...
})
// Custom 400 Page
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found, You are missing Documentation');
});

// custom 500 page
app.use(function(req, res, next){
    console.error(error.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){ +
    console.log('Server Started');
    console.log('Express started on http;//localhost:' +
         app.get('port') + '; press Ctrl-C to terminate the application.' );
    console.log("** Server Started Port **");
});
