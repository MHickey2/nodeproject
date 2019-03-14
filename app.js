var express = require("express");

var app = express();

var product = require("./model/product.json");    // allow the app to access the product.json file
var contact = require("./model/contact.json");

app.use(express.static("views"));
app.use(express.static("scripts"));
app.use(express.static("images"));
app.set("view engine", "ejs");


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

app.get('/add', function(req, res) {
res.render("add"); // we use the res.render command to on the response object to display the jade page as html
console.log("ad page has been displayed"); // used to output activity in the console
});

app.get('/products', function(req, res) {
res.render("products", {product:product}); // we use the res.render command to on the response object to display the jade page as html
console.log("products page has been displayed"); // used to output activity in the console
});

app.get('/item/:id', function(req, res) {
  var p = req.params.id;
  console.log(req.params.id);
  //res.render("item", {product`: product});
  res.render("item", {product: product, p: req.params.id});
  //res.render("item"), {p: req.params.id};
  console.log("item page now rendered");    // the log function is used to output data to the terminal. 
});



// this code provides the server port for our application to run on
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("webpage is up");
  
});



  