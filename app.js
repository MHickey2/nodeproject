var express = require("express");

var app = express();

app.use(express.static("views"));

app.use(express.static("scripts"));

app.use(express.static("images"));

app.set("view engine", "ejs");

var products = require("./models/products.json");    // allow the app to access the products.json file


// set up simple hello world application using the request and response function
//app.get('/', function(req, res) {
//res.send("Hello World"); // we set the response to send back the string hello world
//console.log("Hello World"); // used to output activity in the console
//});

// this code provides the server port for our application to run on
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");
  
});

app.get('/', function(req, res) {
res.render("index.ejs"); // we use the res.render command to on the response object to display the jade page as html
console.log("index page has been displayed"); // used to output activity in the console
});

app.get('/character', function(req, res) {
res.render("character"); // we use the res.render command to on the response object to display the jade page as html
console.log("character page has been displayed"); // used to output activity in the console
});

app.get('/fanclub', function(req, res) {
res.render("fanClub"); // we use the res.render command to on the response object to display the jade page as html
console.log("fanclub page has been displayed"); // used to output activity in the console
});

app.get('/products', function(req, res) {
res.render("products"); // we use the res.render command to on the response object to display the jade page as html
console.log("products page has been displayed"); // used to output activity in the console
});

// app.get('/products', function(req, res) {
// res.render("products", {products}); // we use the res.render command to on the response object to display the jade page as html
// console.log("products page has been displayed"); // used to output activity in the console
// });
