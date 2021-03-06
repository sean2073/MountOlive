const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3000;

var app = express();
var favicon = require('express-favicon');

//Express Middleware
app.set('view engine', 'hbs');
// I'm using this so that I don't have to create a route to everyting
//for instance there is a help.html page that is now part of the site
//but I didn't create a route for it.
hbs.registerPartials(__dirname + '/views/partials');

//app.use('/images',express.static(__dirname + 'assets'));
app.use(express.static(__dirname + '/assets'));
app.use('/css', express.static(__dirname + '/assets'));
app.use('/images', express.static(__dirname + '/assets'));
app.use('/javascript', express.static(__dirname + '/assets'));
//app.use(express.static(__dirname + '/assets/images'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=> {
        if(err){
            console.log("Unable to append to server.log file");
        }
    });
    next();
});
// app.use((req,res, next)=>{
//     res.render('maintenance.hbs');
// });


hbs.registerHelper('getCurrentYear', function() {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase(); 
});

app.get("/", function(req, res) {
  // res.send('<h1>Hello Express!<h1>');
  res.render("home.hbs",{
    name: "Sean",
    likes: ["Fried shrimp with 3 tartar sauces", "Noel, sometimes"],
    pageTitle: 'Home Page',
    //currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome!  You Rock!!'
  });
});
app.get("/about.html", function(req, res) {
    
 res.render("about.hbs", {
     pageTitle: 'About Page',
     //currentYear: new Date().getFullYear()
 });
});
//app.use(favicon(__dirname + './assets/images/favicon.ico'));
//app.use(express.static('/assets/images'));
/*
app.get("/projects", function(req, res) {
    
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        //currentYear: new Date().getFullYear()
    });
   });

app.get("/bad", function(req, res) {

res.send({
    ErrorMessage: 'Unable to handle request!'
});
});

*/
app.listen(port, function(){
console.log("app is running on port " + port);
});
/*
app.get('/', (req, res) => {

});
app.get("/api/friends", function (req, res) {
    res.json(userData);

});
*/
