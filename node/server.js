/** RESR API for the members app **/

//** Application Dependencies */
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var passwordHash = require('./lib/password-hash');
var apiKey = "sha1$6d34ad90$1$931b0a54af9a492f33b59e108a16e07ed3232c9e";


/** New Application ENV OBJ */
var app = express();

app.set('jsonp callback name', 'callback');

// needed to parse the post payload
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/** Initiate Mysql Connection */
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
database :'wodbucket',
password : 'rew1nded'
});

connection.connect();

/** Actions */
app.get('/',function(req,res){
res.send('Woodbucket REST API');
});

// log all requests
app.all('*', function(req, res, next) {
    console.log("Received request to " + req.url);
    next();
});

/** ************************************************************************ **/
/** WODS **/
/** ************************************************************************ **/

/** get all groups **/
app.get('/api/wod/all',function(req,res){
var results;
connection.query('SELECT w.id, w.date, w.wodname, w.woddescription, (SELECT Group_Concat(name) FROM wod_movement_scheme WHERE wodId=w.id) AS movement FROM wod_scheme w', function(err, rows, fields) {
if (err) throw err;
results = rows;
res.type('application/json');
res.jsonp(results);
});
});




/** ************************************************************************ **/
/** USERS **/
/** ************************************************************************ **/

/** get user by id  **/
app.get('/api/user/:id',function(req,res){

});

/** get all users  **/
app.get('/api/user',function(req,res){

});

/** login user by e-mail  **/
app.get('/api/user/login/:email/:pwd',function(req,res){



  var results;
  connection.query('SELECT * FROM vkc.users WHERE eMail = "'+ req.params.email +'"', function(err, rows, fields) {
  if (err) throw err;
  results = rows;
  //console.log(rows[0].password);
  res.type('application/json');

  /** Code to hash passwords
  var hashedPassword = passwordHash.generate(rows[0].password);

  ** verify password
  console.log(passwordHash.verify(req.params.pwd, rows[0].password));
  **/
  if (rows.length > 0) {

  if (passwordHash.verify(req.params.pwd, rows[0].password)==true) {
    //console.log("true");
    var authenticated = [{
      authenticated:"true",
      usr:req.params.email,
      pwd:rows[0].password,
      firstName:rows[0].firstName,
      lastName:rows[0].lastName,
      mobile:rows[0].mobile,
      isAdmin:rows[0].isAdmin,
      apikey: apiKey
    }];
    res.jsonp(authenticated);
  } else {
    //console.log("false");
    var authenticated = [{authenticated:"false"}];
    res.jsonp(authenticated);
  }
} else {
  var authenticated = [{authenticated:"false"}];
  res.jsonp(authenticated);
}

  //res.jsonp(results);
  });


});



console.log("Node open for business at /api/: on port 3000 Use ctrl-c to stop");

app.listen(3000);
