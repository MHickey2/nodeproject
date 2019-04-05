var express = require("express");

var app = express();


//call sql into action
var mysql = require('mysql');

var fs = require('fs');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

var product = require("./model/product.json");    // allow the app to access the .json files
var contact = require("./model/contact.json");

app.use(express.static("views"));
app.use(express.static("scripts"));
app.use(express.static("images"));
app.set("view engine", "ejs");

//connectivity to sql database
const db = mysql.createConnection ({
    host: "den1.mysql6.gear.host",
    user: "characters1",
    password: "Tc3VJ~6m0?eV",
    database: "characters1"    
   
    
    
// });

//connectivity to sql database
// const db = mysql.createConnection ({
//     host: "den1.mysql6.gear.host",
//     user: "characters",
//     password: "Tc3VJ~6m0?eV",
//     database: "characters1"    
   
    
    
 });

db.connect((err) => {
    if(err){
        console.log("connection not working");
        }
        else {
            console.log("the connection is working");
        }
    
});


//routes for application
app.get('/', function(req, res) {
    res.render("index.ejs"); // res.render command to on the response object to display the ejs page as html
    console.log("index page has been displayed"); // used to output activity in the console
});

//**************Sql details***************//


// create a route to create a database table

//  app.get('/createtable', function(req, res){
// // //  //   let sql = 'CREATE TABLE trivia (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, chrId int, Trivia text);'
//     let sql = 'CREATE TABLE characters1 (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Description text, Image varchar(255));'
    
//     let query = db.query(sql, (err,res) => {
        
//         if(err) throw err;
//         console.log("we have a problem");
//     });
    
//     res.render("createtable");
//     console.log("table created");
// });

// // Route to create a character in character database
app.get('/createcharacter', function(req, res){
    let sql = 'INSERT INTO characters1 ( Name, Description, Image) VALUES ("Dean Winchester", "Head Character of the show", "dean.jpg")'
     let query = db.query(sql, (err,res) => {
        if(err) throw err;
    });
    res.render("Character One inserted into table");
    console.log(res);
});

// Route to create the characters in the character database
//  app.get('/filldatabase', function(req, res){
//      let sql = 'INSERT INTO characters1 ( Name, Description, Image) VALUES 
//      ("Sam Winchester","The younger brother" "sw.jpg"),
//      ("Castiel","A human possessed by an angel", "cs.jpg"),
//      ("Crowley", "Following the cancelled apocalypse", "crow.jpg"),
//      ("Rowena", "Rowena is a powerful witch", "row.png"),
//      ("Lucifer", "Lucifer has gone through quite a transition ", "luc.gif")'

//      let query = db.query(sql, (err,res) => {
//         if(err) throw err;
//     });
//     res.render("Characters inserted into table");
//     console.log(res);
// });


// // Route to show all characters from database 
app.get('/characterssql', function(req, res){
    
    let sql = 'SELECT * FROM characters1';
    let query = db.query(sql, (err,res1) => {
        
        if(err) throw err;
        
        res.render('characterssql', {res1});
        console.log(res1);
    });
    
  
   
    
 });

// // route to render create character page
app.get('/createsql', function(req, res){
    res.render('createsql');
});

// // route to post new character
app.post('/createsql', function(req, res){
    let sql = 'INSERT INTO characters1 (Name, Description, Image) VALUES ("'+req.body.name+'", "'+req.body.description+'", "'+req.body.image+'")'
     let query = db.query(sql, (err,res) => {
        if(err) throw err;
    });
  res.redirect("/characterssql");
 
});

// //route for editing characters
app.get('/edit/:id', function(req, res){
    let sql = 'SELECT * FROM characters1 WHERE Id = "'+req.params.id+'" ';
    let query = db.query(sql, (err, res1) => {
        if(err) throw err;
        console.log(res1);
        res.render('edit', {res1});
    });
});


// // Post request URL to edit character with SQL
app.post('/edit/:id', function(req, res){
    let sql = 'UPDATE characters1 SET Name = "'+req.body.name+'", Description = "'+req.body.description+'", Image = "'+req.body.image+'" WHERE Id ="'+req.params.id+'"';
    let query = db.query(sql, (err, res) => {
        if(err) throw err;
    });
    res.redirect("/characterssql");
    console.log("Character has been updated");
});


// // route to delete sql character 

app.get('/deletesql/:Id', function(req, res){
   
  let sql = 'DELETE FROM characters1 WHERE Id = '+req.params.Id+' ' 
  let query = db.query(sql, (err, res ) => {
      if(err) throw err;
  
       
  });
  res.redirect("/characterssql");
  console.log("character deleted"); 
    
});


// // route to show individual page 

app.get('/show/:Id', function(req, res){
    
    let sql = 'SELECT * FROM characters1 WHERE Id = '+req.params.Id+'';
    let query = db.query(sql, (err,res1) => {
        
        if(err) throw err;
        
        res.render('show', {res1});
        
    });
    
    res.send(res1);
    
    
});


 //***************end of sql***************//

// app.get('/character', function(req, res) {
//     res.render("character"); // res.render command to on the response object to display the ejs page as html
//     console.log("character page has been displayed"); // used to output activity in the console
// });

//function to add products page
app.get('/products', function(req, res) {
    res.render("products", {product:product}); // res.render command to on the response object to display the ejs page as html
    console.log("products page has been displayed"); // used to output activity in the console
});

//function to add contact page
app.get('/fanclub', function(req,res){
    res.render("fanclub", {contact:contact}); // res.render command to display the contact.json file in fanclub page
    console.log("welcome to the stored comment page"); // used to output activity in the console
});

//function to add contact page
app.get('/add', function(req,res){
    res.render("add");      // res.render command to display the add contact page
    console.log("welcome to add a comment page"); // used to output activity in the console
});

//function to add product page
app.get('/addProducts', function(req,res){
    res.render("addProducts");     // res.render command to display the add products page
    console.log("welcome to add products page"); // used to output activity in the console
});


//function to update product page
app.get('/productUpdate', function(req,res){
    res.render("productUpdate");    // res.render command to display the update products page
    console.log("welcome to update products page"); // used to output activity in the console
});

//function to see see one contact page
app.get('/onecontact', function(req,res){
    res.render("onecontact");   // res.render command to display the content of one contact page
    console.log("welcome to the individual contact page"); // used to output activity in the console
});


//***************** contact details **************************


//*************add contact details***************//
app.post('/add', function(req,res){

    // Write a function to find the max id in JSON file
 
    function getMax(contact, id) {
        var max;
        for (var i=0; i<contact.length; i++) {
            if(!max || parseInt(contact[i][id]) > parseInt(max[id]));
            max = contact[i];
        }
        console.log("The max id is " + max);
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
    
    };
    var json = JSON.stringify(contact); // we tell the application to get our JSON readdy to modify
    // Push the data back to the JSON file
    
    fs.readFile('./model/contact.json', 'utf8', function readfileCallback(err){
        if(err){
            throw(err);
            
        } else {
            
          contact.push(contactsx);  // add the new contact to the JSON file
          json = JSON.stringify(contact, null, 4); // structure the new data nicely in the JSON file
          fs.writeFile('./model/contact.json', json, 'utf8');
        }
    });
    
    res.redirect('/fanclub');
    
});



//*************function to see individual contact**************//

app.get('/onecontact/:id', function(req, res) {
  var json = JSON.stringify(contact);
     // Get the id we want to delete from the URL parameter 
     var keyToFind = parseInt(req.params.id); 
     var data = contact;
      // lets map the data and find the information we need
    var index1 = data.map(function(contact){return contact.id;}).indexOf(keyToFind);
   
  
  console.log(req.params.id);
  res.render("onecontact", {contact: contact, c: index1});
  console.log("individual contact page now rendered");    // the log function outputs data to the terminal. 
});



//*********** Function to delete a contact **************//

app.get('/deletecontact/:id', function(req,res){
    
    var json = JSON.stringify(contact);
     // Get the id we want to delete from the URL parameter 
    var keyToFind = parseInt(req.params.id); 
    
    var data = contact; // Declare the json file as a variable called data
    
    // lets map the data and find the information we need
    var index = data.map(function(contact){return contact.id;}).indexOf(keyToFind);
    
    // JavaScript allows us to splice our JSON data
    
    contact.splice(index, 1); // delete only one item from the position of the index variable above
    
      
      json = JSON.stringify(contact, null, 4); // structure the new data nicely in the JSON file
        fs.writeFile('./model/contact.json', json, 'utf8');

    console.log("it has been removed!");    
    res.redirect('/fanclub');

});


//***************** render route to edit contact*************// 
//function to add contact update page
app.get('/contactUpdate/:id', function(req,res){
    console.log("contact update page rendered");
    function chooseContact(indOne){
        return indOne.id === parseInt(req.params.id);
    }
    
    var indOne = contact.filter(chooseContact);
        res.render('contactUpdate', {indOne:indOne});
        console.log(indOne);
});


//************* post request to edit contact***************// 

app.post('/contactUpdate/:id', function(req,res){
    
    var json = JSON.stringify(contact);
    var keyToFind = parseInt(req.params.id);  // Find the data we need to edit
    var data = contact; // Declare the json file as a variable called data
    var index = data.map(function(contact){return contact.id;}).indexOf(keyToFind); // map out data and find what we need
    
      
        var n = req.body.newName;
        var i = parseInt(req.body.newId);
        var c = req.body.newComment;
        var e = req.body.newEmail;
        
         
         contact.splice(index, 1, {id: i, name: n, email: e, comment: c} ); 
         json = JSON.stringify(contact, null, 4);
         fs.writeFile("./model/contact.json", json, 'utf8' );
    
    console.log(n,i,e,c);
    
    res.redirect("/fanclub");
    console.log("contact update page is rendered");
});

//***********Products section***************//


//***********function to see individual items in products*************//
app.get('/item/:id', function(req, res) {
  var json = JSON.stringify(product);
     // Get the id we want to delete from the URL parameter 
     var keyToFind = parseInt(req.params.id); 
    
      // lets map the data and find the information we need
    var index1 = product.map(function(product){return product.id;}).indexOf(keyToFind);
    
  
  console.log(req.params.id);
  res.render("item", {product: product, p:index1});
  console.log("item page now rendered");    // the log function outputs data to the terminal. 
});


// *********** Function to delete a product **************//

app.get('/deleteproduct/:id', function(req,res){
    
     var json = JSON.stringify(product);
     // Get the id we want to delete from the URL parameter 
     var keyToFind = parseInt(req.params.id); 
    
      // lets map the data and find the information we need
    var index1 = product.map(function(product){return product.id;}).indexOf(keyToFind);
      // JavaScript allows us to splice our JSON data
      product.splice(index1, 1); // delete only one item from the position of the index variable above
   json = JSON.stringify(product, null, 4); // structure the new data nicely in the JSON file
  fs.writeFile('./model/product.json', json, 'utf8');
    console.log("it has been removed!");    
    res.redirect('/products');

});


//*************function to add new products***************//

app.post('/addProducts', function(req,res){

    // Write a function to find the max id in my JSON file
 
    function getMax(product, id) {
        var max;
        for (var i=0; i<product.length; i++) {
            if(!max || parseInt(product[i][id]) > parseInt(max[id]));
            max = product[i];
        }
        console.log("The max id is " + max);
        return max;
    }
   var maxCid = getMax(product, "id");
   var newIdp = maxCid.id + 1; // make a ne variable for id which is 1 larger than the current max
    
    console.log("New id is: " + newIdp);
    // creating a new JSON object
    
    var productsx = {
        name: req.body.name,
        id: newIdp,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image
        
        
    
    };
    var json = JSON.stringify(product); // we tell the application to get our JSON readdy to modify
    // Push the data back to the JSON file
    
    fs.readFile('./model/product.json', 'utf8', function readfileCallback(err){
        if(err){
            throw(err);
            
        } else {
            
          product.push(productsx);  // add the new contact to the JSON file
          json = JSON.stringify(product, null, 4); // structure the new data nicely in the JSON file
          fs.writeFile('./model/product.json', json, 'utf8');
        }
    });
    
    res.redirect('/products');
    console.log("The product has been added");
});


//***************** render route to edit product*************// 
//function to add product update page
app.get('/productUpdate/:id', function(req,res){
    console.log("product update page rendered");
    function chooseProduct(indOne){
        return indOne.id === parseInt(req.params.id);
    }
    
    var indOne = product.filter(chooseProduct)
         res.render('productUpdate', {indOne:indOne});
        console.log(indOne);
});

//************* post request to edit product***************// 

 app.post('/productUpdate/:id', function(req,res){
    
    var json = JSON.stringify(product);
    
    var keyToFind = parseInt(req.params.id);  // Find the data we need to edit
    var data = product; // Declare the json file as a variable called data
    var index = data.map(function(product){return product.id;}).indexOf(keyToFind) // map out data and find what we need

         
        var s = req.body.newName;
        var u = parseInt(req.body.newId);
        var p = req.body.newPrice;
        var d = req.body.newDescription;
        var o = req.body.newImage;
         
         product.splice(index, 1, {id: u, name: s, price: p, description: d, image: o}); 
         
         json = JSON.stringify(product, null, 4);
         fs.writeFile("./model/product.json", json, 'utf8' );
    
        console.log(s,u,p,d,o);
    
        res.redirect("/products");
  });



// code provides the server port for the application to run on
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("webpage is up");
  
});
