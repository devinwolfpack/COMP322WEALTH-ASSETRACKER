const express = require("express");
//import express package so i can create a web server
const path = require("path");
//import the path package to help work with file paths

const app= express(); //creates the express application
const PORT = 3000; //sets the port number the server will run on

let assets =[]; //stores asset data on the server while the server is running

//middleware that will allow the server to read JSON data sent from the frontend
app.use(express.json());
//middleware that logs each request made to the server
app.use(function(req,res,next) {
    console.log(req.method + " request to " + req.url);
    next();

});
//serves the static frontend files, index.html, style.css and script.js
app.use(express.static(path.join(__dirname)));
//get route that sends all asset data back to the front end
app.get("/api/assets", function(req, res) {
    res.json(assets);
});
//post route that receives a new asset from the frontend and stores it on the server
app.post("/api/assets", function(req,res) {
    const newAsset = {
        name: req.body.name,
        category: req.body.category,
        value: Number(req.body.value)
    };
    assets.push(newAsset); //adds the new asset to the assets array

    res.json(newAsset); //sends the new asset back as a response
});
//starts the server and listens for requests on port 3000
app.listen(PORT, function() {
    console.log("Server is running on http://localhost:" + PORT);
});