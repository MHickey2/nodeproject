var express = require("express");

var app = express();

var product = require("./model/product.json");    // allow the app to access the product.json file

/*var json = JSON.stringify(product); // Convert our json data to a s*/

var json = JSON.stringify(contact); // Convert our json data to a s

json = JSON.stringify(contact, null, 4); // converts the data to a JSON file and the null and 4 represent how it is structure. 4 is indentation 



var contact = require("./model/contact.json"); 

var contactsx = {
    id: newId,
    name: req.body.name,
    Comment: req.body.comment,
    email: req.body.email

  };

var fs = require('fs');


app.use(express.static("views"));

app.use(express.static("scripts"));

app.use(express.static("images"));

app.set("view engine", "ejs");

  fs.readFile('./model/contact.json', 'utf8', function readFileCallback(err) {

   if(err){
     throw(err);
    } 
    
   else {
    }
   
  })
    
   contact.push(contactsx); // add the data to the JSON file based on the declared variable above

fs.writeFile('./model/contact.json', json, 'utf8')

// set up simple hello world application using the request and response function
//app.get('/', function(req, res) {
//res.send("Hello World"); // we set the response to send back the string hello world
//console.log("Hello World"); // used to output activity in the console
//});

// this code provides the server port for our application to run on
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("webpage is up");
  
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
res.render("products", {product}); // we use the res.render command to on the response object to display the jade page as html
console.log("products page has been displayed"); // used to output activity in the console
});


/*do you put post here how can you see it?*/
app.get('/add', function(req, res){
      res.render("add", {contact});
     console.log("You are on the add contacts page");
});



  // function to find the max id
    
  	function getMax(contacts , id) {
		var max
		for (var i=0; i<contacts.length; i++) {
			if(!max || parseInt(contact[i][id]) > parseInt(max[id]))
				max = contacts[i];
			
		}
		return max;
	}	

var maxPpg = getMax(contact, "id"); // This calls the function above and passes the result as a variable called maxPpg based on the params passed which are contacts as the variable at the top of the app.js file which represents the JSON file and the value we are looking for in this case id 

	newId = maxPpg.id + 1;  // this creates a nwe variable called newID which is the max Id + 1

	console.log(newId); // We console log the new id for show reasons only
