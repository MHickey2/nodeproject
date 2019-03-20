var express = require("express");

var app = express();

var fs = require('fs');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

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


app.get('/products', function(req, res) {
    res.render("products", {product:product}); // we use the res.render command to on the response object to display the jade page as html
    console.log("products page has been displayed") // used to output activity in the console
});

//function to add contact page
app.get('/fanclub', function(req,res){
    res.render("fanclub", {contact:contact});
    console.log("welcome to add a comment page")
});

//function to add contact page
app.get('/add', function(req,res){
    res.render("add");
    console.log("welcome to add a comment page")
});

app.post('/add', function(req,res){

    // Write a function to find the max id in my JSON file
 
    function getMax(contact, id) {
        var max
        for (var i=0; i<contact.length; i++) {
            if(!max || parseInt(contact[i][id]) > parseInt(max[id]))
            max = contact[i];
        }
        console.log("The max id is " + max)
        return max;
    }
   var maxCid = getMax(contact, "id");
   var newId = maxCid.id + 1; // make a ne variable for id which is 1 larger than the current max
    
    console.log("New id is: " + newId);
    // creating a new JSON object
    
    var contactsx = {
        name: req.body.name,
        Comment: req.body.comment,
        id: newId,
        email: req.body.email
    
    }
    var json = JSON.stringify(contact) // we tell the application to get our JSON readdy to modify
    // Push the data back to the JSON file
    
    fs.readFile('./model/contact.json', 'utf8', function readfileCallback(err){
        if(err){
            throw(err)
            
        } else {
            
          contact.push(contactsx)  // add the new contact to the JSON file
          json = JSON.stringify(contact, null, 4) // structure the new data nicely in the JSON file
          fs.writeFile('./model/contact.json', json, 'utf8')
        }
    })
    
    res.redirect('/fanclub')
    
});




//function to see individual items
app.get('/item/:id', function(req, res) {
  var json = JSON.stringify(product);
     // Get the id we want to delete from the URL parameter 
     var keyToFind = parseInt(req.params.id); 
    
      // lets map the data and find the information we need
    var index1 = product.map(function(product){return product.id;}).indexOf(keyToFind)
    
  
  console.log(req.params.id);
  res.render("item", {product: product, p:index1});
  console.log("item page now rendered");    // the log function outputs data to the terminal. 
});

//// ########## Function to delete a contact ####

app.get('/deletecontact/:id', function(req,res){
    
     var json = JSON.stringify(contact);
     // Get the id we want to delete from the URL parameter 
     var keyToFind = parseInt(req.params.id); 
    
    var data = contact // Declare the json file as a variable called data
    
    // lets map the data and find the information we need
    var index = data.map(function(contact){return contact.id;}).indexOf(keyToFind)
    
    // JavaScript allows us to splice our JSON data
    
    contact.splice(index, 1); // delete only one item from the position of the index variable above
    
      
      json = JSON.stringify(contact, null, 4) // structure the new data nicely in the JSON file
      fs.writeFile('./model/contact.json', json, 'utf8')

    console.log("it has been removed!")    
    res.redirect('/fanclub')

});



//// ########## Function to delete a product ####

app.get('/deleteproduct/:id', function(req,res){
    
     var json = JSON.stringify(product);
     // Get the id we want to delete from the URL parameter 
     var keyToFind = parseInt(req.params.id); 
    
      // lets map the data and find the information we need
    var index1 = product.map(function(product){return product.id;}).indexOf(keyToFind)
      // JavaScript allows us to splice our JSON data
      product.splice(index1, 1); // delete only one item from the position of the index variable above
   json = JSON.stringify(product, null, 4) // structure the new data nicely in the JSON file
  fs.writeFile('./model/product.json', json, 'utf8')
    console.log("it has been removed!")    
    res.redirect('/products')

});



// this code provides the server port for our application to run on
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("webpage is up");
  
});