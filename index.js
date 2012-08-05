// main script

// superuser access for authentication
// will push this to the db eventually
var authMap = {
    "user":'foo',
    "password":'bar'
    };

// authenticatin map of app
//     resource => auth needed?
var urlMap = {
    "/": false,
    "/login": false,
    "/logout": true,
    "/crud": true
    };

// the connect prepreqs
var connect = require('connect'),
    login = require('./login.js'),
    logout = require('./logout.js'),
    crud = require('./crud.js'),
    auth = require('./auth.js'),
    display = require('./display.js');

// the database connection and info
var dbName = 'test',
    userColl = 'users',
    questColl = 'questionnaires';

var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;

var server = new Server('localhost', 27017, {auto_reconnect: true}),
    db = new Db(dbName, server);

// the app with middleware
var app = connect()
        .use(connect.logger({ format: ':method :url' }))
        .use(connect.cookieParser())
        .use(connect.session({ secret: 'foobar' }))
        .use(connect.bodyParser())
        .use(auth(urlMap))
        .use('/login', login(authMap))
        .use('/logout', logout())
        .use('/crud', crud(db))
        .use(display(db, questColl));

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
