// require express
var express = require('express')
var app = express();


// require body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index');
});


// require mongoose
var connectionString =   'mongodb://127.0.0.1:27017/tiny-url'; // for local
if(process.env.MONGODB_URI) { // check if running remotely
    connectionString = process.env.MONGODB_URI;
}

// connect with mongoose
var mongoose = require('mongoose');
var global = mongoose.connect(connectionString,{useNewUrlParser : true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected with mongoose');
});


// configure rest end points access
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        req.headers.origin);
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.listen(process.env.PORT || 5500, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});