var express = require("express");

var app = express();

var product = require("./model/product.json");    // allow the app to access the product.json file

var contact = require("./model/contact.json"); 

/*var json = JSON.stringify(product); // Convert our json data to a s*/

//var json = JSON.stringify(contact); // Convert our json data to a s

//json = JSON.stringify(contact, null, 4); // converts the data to a JSON file and the null and 4 represent how it is structure. 4 is indentation 





//var contactsx = {
 //   id: newId,
  //  name: req.body.name,
  //  Comment: req.body.comment,
  //  email: req.body.email

 // };

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
    
  // contact.push(contactsx); // add the data to the JSON file based on the declared variable above

//fs.writeFile('./model/contact.json', json, 'utf8')

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
res.render("products", {product:product}); // we use the res.render command to on the response object to display the jade page as html
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

//	newId = maxPpg.id + 1;  // this creates a nwe variable called newID which is the max Id + 1

//	console.log(newId); // We console log the new id for show reasons only


<!DOCTYPE html>
<html>
  <head>
   <meta charset="UTF-8">
   <title>Supernatural Web Site</title>
    
   <link rel="stylesheet" href="app.css" type="text/css">
  </head>
  
<body>
        
    <% include ../partial/header %>
    <!--my page info goes here-->
  
    <ul>
        <li><%- contact[p].name %> - <%- contact[p].name %></li>
        <li><%- contact[p].email %> </li> 
        <li><%- contact[p].comment %> </li> 
        <br>
        <a href="/deletecontact/<%= contact.id %>" class="button">Remove this item!</a>
        <br>
        <br>
        <li><a href="/fanclub">back to contacts</a></li>
        <br>                  
    </ul>

    <% include ../partial/footer %>
 
</body>
</html>
<!DOCTYPE html>
<html>
  <head>
   <meta charset="UTF-8">
   <title>Supernatural Web Site</title>
    
   <link rel="stylesheet" href="app.css" type="text/css">
  </head>
  
<body>
        
    <% include ../partial/header %>
    <!--my page info goes here-->
  
    <ul>
        <li><%- contact[p].name %> - <%- contact[p].name %></li>
        <li><%- contact[p].email %> </li> 
        <li><%- contact[p].comment %> </li> 
        <br>
        <a href="/deletecontact/<%= contact.id %>" class="button">Remove this item!</a>
        <br>
        <br>
        <li><a href="/fanclub">back to contacts</a></li>
        <br>                  
    </ul>

    <% include ../partial/footer %>
 
</body>
</html>
<% include ../partials/header %>

<div class="row">
    
    
    <h1>Welcome to the Edit Contact Page</h1>
    <div class="grid-container" style="width: 100%;">
        
        
        
    <% res.forEach(function(indOne) { %>
    
    
    
        <form accept-charset="UTF-8" action="/editcontact/<%= indOne.id %>" method="post">
            
            
            <div class="item" style="width: 100%;">
                
                <label for="name">Name</label>
                <input name="name" type="text" value="<%= indOne.name %>">
                
                
                <label for="comment">Comment</label>
                <input name="comment" type="text" value="<%= indOne.Comment %>">
                
                <label for="email">Email</label>
                <input name="email" type="text" value="<%= indOne.email %>">
                
                <button class="button">Make The Change</button>
                
            </div>
            
            
            
        </form>
    <% }); %>
    
    </div>
    
</div>




<% include ../partial/footer %>



 
    <div class="row">
    
    
    <h1 class="center">Welcome to the contacts page</h1>
    
    <div class="grid-container1">
      
      
      <% contact.forEach(function(contact) { %>
      
           <div class="item1">     
                <div class="item">
                   <h1 class="itemtitle">Id: <%= contact.id %></h1>
                   <h1 class="itemp">Name: <%= contact.name %> </h1>
                    <h1 class="itemp">Email: <%= contact.email %> </h1>
                    <h1 class="itemp">Comment: <%= contact.Comment %> </h1>
                    <a href="/deletecontact/<% contact.id %>" class="button">Delete Me!</a>
                    <a href="/item/<% contact.id %>">View item</a><br>
                    </div>
            </div>
              
              
       <% }); %> 
              
           
    </div>
    </div>
  
</div>


/function to see individual contact messages
app.get('/contactUpdate/:id', function(req, res) {
  var json = JSON.stringify(contact);
     // Get the id to delete from the URL parameter 
     var keyToFind = parseInt(req.params.id); 
    
      // lets map the data and find the information we need
    var index2 = contact.map(function(contact){return contact.id;}).indexOf(keyToFind)
    
  
  console.log(req.params.id);
  res.render("contactUpdate", {contact: contact, p:index2});
  console.log("individual contact page now rendered for changes");    // the log function outputs data to the terminal. 
});



// Route to create a character in character database
//  app.get('/fill database', function(req, res){
//      let sql = 'INSERT INTO characters ( Name, Description, Image) VALUES 
// ("Dean Winchester", "Head character of the series and the battled warrior who keeps the show on the road, literally with his 
// classic impala.  He has gone to hell and back and has lived to fight the day. He has been possessed, killed by hell dogs, had 
// the mark of Cain and been the vessel for Michael, so has had a multitude of bad experiences, but despite these experiences is a witty guy 
// with a hankering for pie and a determination to always do the right thing and in many ways is the heart of the series.", "hoodie.jpg"),

// ("Sam Winchester","The younger brother and the one that nearly got away, he tried to leave the family business of hunting demons 
// and wanted an ordinary life, but alas it was not meant to be and he returned to the fold.  He has had his trials and tribulations 
// but has embraced the hunter life.  He tends to be the more controlled of the brothers and keeps a calm head but will do anything 
// to protect his family." "hoodie.jpg"),

// ("Castiel","A human possessed by an angel, Castiel made quite an impression when he joined the series so much, so he became a 
// regular and a long-time ally of the Winchesters.  Particularly close to Dean, they both have risked everything in a bid to protect 
// each other and their loyalty to one another knows no bounds. Castiel has learned to be human and the journey has been enlightened, 
// he instils a lot of the humour in the series.", "hoodie.jpg"),

// ("Crowley", "Following the cancelled apocalypse, Crowley sneaks in and appoints himself the King of Hell, keeping hold of that position 
// albeit by a thread. Throughout his reign, he proves himself to be a good strategist. He knows how to keep a low profile when a bigger 
// bully appears. He’s always looking for ways to consolidate his power and will always tend to choose the winning side. Not that he is 
// not in his right a powerful foe.  He had a budding bro relationship with Dean for a while and their uneasy alliance proves a comical 
// spectacle.  Alas he died in the series, but in Supernatural does anyone truly die.", "hoodie.jpg"),

// ("Rowena", "Rowena is a powerful witch who’s witching powers have proved both a help and a hindrance to the Winchesters. Not only is 
// she a powerful adversary she is has also the mother of Crowley.  She has a wide network of covens to work with and she has a lot of 
// spells to access, so with her there is a good chance your reality will be altered, in the later seasons she has had cause to join the 
// Winchesters in their fight against the darkness, but her own needs are never far from her motivations. She will sacrifice anyone to 
// further her own needs so can never fully be trusted, but she has proved a strong female character in the series.", "hoodie.jpg"),

// ("Lucifer", "Lucifer has gone through quite a transition since first appearing in the series. He originally had a regal and 
// self-righteous personality, but later in the seasons his more snide, jokier personality came to the fore. However he is one of the 
// Winchesters more persistent pain in their side.  Always willing to strike a deal he is not beyond threats and blackmail, he always has 
// a plan in the pipeline and it can never be good for the whole of mankind.", "hoodie.jpg")'


//      let query = db.query(sql, (err,res) => {
//         if(err) throw err;
//     });
//     res.render("Characters inserted into table");
//     console.log(res);
// });

<% include ../partial/header %>

<div class="row">
 <br>
 <br>
 <br>
 <br>
 <br>
    <h1>Update a product with SQL and Node</h1>
    
    <div class="grid-container">
        
<% res1.forEach(function(characters) {%>        
        <form accept-charset="UTF-8" action="/edit/<%= characters.Id %>" method="post">
            
            <div class="item">
                <label for="id">Id:</label>ID: <%= characters.id %></label>
                <input name="id" type="text" value="<%= characters.Id %>" />
                
                <label for="name">Name:</label>
                <input name="name" type="text" value="<%= characters.Name %>" />
                
                <label for="description">Description:</label>
                <input name="description" type="text" value="<%= characters.Description %>" /> 
                
                <label for="image">Image:</label>
                <input name="image" type="text" value="<%= characters.Image %>" />  
                
                                 
                
                <button class="button">Edit Character</button>
            </div>
            
            
            
        </form>
        
      <% }); %>  
    </div>
    
    
</div>



</body>
<% include ../partial/footer %>




   <!--<a href="/seeEntry" class="button">seeEntry</a>-->
     <!--     <div class="item2">     -->
     <!--           <br> -->
     <!--                   <button id="myButton2">See Trivia</button>-->
     <!--                   <button id="myButton3">Hide information</button>-->
     <!--             <br>  -->
                    
     <!--             <br>-->
     <!--             <div id="dean3">-->
     <!--               <h3 class="item">Trivia: <%=# trivia1.Trivia %></h3>-->
     <!--             </div> -->
     
        
     <!--   </div>-->
              
              
     <!--<% }); %>             -->
                    
        
        
        <!--<div class="grid-container2">-->
            
    <!--    <% res.forEach(function(characters1) { %>

    <!--        <div class="item2">-->
    <!--            <div class="item">-->
                    
    <!--                <h1 class="itemp">Name: <%=# characters1.Name %></h1>-->
               
    <!--            </div>-->
    <!--        </div>-->


    <!--    <% }); %>-->

    <!--</div>-->
                    
                    <div class="grid-container2">
            
        <% res1.forEach(function(characters1) { %>

            <div class="item2">
                <div class="item">
                    <h1 class="itemtitle">Id: <%= characters1.chrId %></h1>
                    <h1 class="itemp">Name: <%= characters1.Name %></h1>
                    
    <br> 
                </div>
            </div>
        <% }); %>
    </div>