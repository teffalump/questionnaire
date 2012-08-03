// main script

// the connect app, with all its middleware
var connect = require('connect');
var login = require('./login.js');
var logout = require('./logout.js');
var crud = require('./crud.js');
var auth = require('./auth.js');
var display = require('./display.js');

// mapping of bool = authentication needed? to uri
var urlMap = {
    "/": false,
    "/login": false,
    "/logout": true,
    "/crud": true
    };
// superuser info
var authMap = {
    "user":'foo',
    "password":'bar'
    };

var app = connect()
        .use(connect.logger({ format: ':method :url' }))
        .use(connect.cookieParser())
        .use(connect.session({ secret: 'foobar' }))
        .use(connect.bodyParser())
        .use(auth(urlMap))
        .use('/login', login(authMap))
        .use('/logout', logout())
        .use('/crud', crud())
        .use(display());


// https options -- need key and cert
//var https = require('https');
//var fs = require('fs');
//var options = {
    //key: fs.readFileSync('./key.pem'),
    //cert: fs.readFileSync('./cert.pem')
//};

// start the server
//https.createServer(options, app).listen(9000);

var http = require('http');
http.createServer(app).listen(9000);
