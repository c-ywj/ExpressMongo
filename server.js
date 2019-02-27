var express    = require("express"); 
var path       = require("path"); 
var bodyParser = require("body-parser"); 
var index      = require("./routes/index"); 
var students   = require("./routes/students"); 
var config     = require('./config'); 

var app = express(); 

// View engine 
var ejsEngine = require("ejs-locals"); 

app.engine("ejs", ejsEngine);   // support master pages 
app.set("view engine", "ejs");  // ejs view engine 


// Set static folder.
//the __dirname is a public variable in node environment, and provides a fully qualified path regardless of where the node environment is hosted
app.use(express.static(path.join(__dirname, "clients"))); 


// Body parser middleware 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false})); 

 // routes
app.use("/", index); 
app.use("/api", students);

app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*"); 
    // Request methods you wish to allow 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next();
})

 

app.listen(config.port, function() { 
    console.log("Server started on port " + config.port) 
}); 