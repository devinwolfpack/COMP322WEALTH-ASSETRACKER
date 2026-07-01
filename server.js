require("dotenv/config");
//loads environment vairables from the .env file
//allows the server to access DATABASE_URL without hardcoding it
const express = require("express");
//import express package so i can create a web server
const path = require("path");
//import the path package to help work with file paths
const {PrismaClient} = require("./generated/prisma");
//imports prisma client so the server can communicate with database
const {PrismaPg} = require("@prisma/adapter-pg");
//imports the postgreSQL adapter that prisma uses to connect to the database

const app= express(); //creates the express application
const PORT = 3000; //sets the port number the server will run on
const adapter = new PrismaPg({ 
    connectionString: process.env.DATABASE_URL
});
//creates a pprisma client instance using the adapter

const prisma = new PrismaClient({
    adapter: adapter
});

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
app.get("/api/assets", async function(req, res) {
    try{//get all assets from the database and sort them by id
        const assets = await prisma.asset.findMany({
            orderBy: {
                id: "asc"
            }
        });
    res.json(assets);
    }
    catch (error) {
        res.status(500).json({
            message: "Could not get assets"
        });
    }
});
//post route that receives a new asset from the front end and saves it on the database
app.post("/api/assets", async function(req,res) {
    try {
     const   name= req.body.name;
     const  category= req.body.category;
      const  value= Number(req.body.value);
    if(!name || !category || value <=0) {
        return res.status(400).json({
            message: "Name,category,and a value greater than 0 are required"
        });
    }
    //creates a new asset record in the database
    const newAsset = await prisma.asset.create({
        data: {
            name: name,
            category: category,
            value: value
        }
    });

    res.json(newAsset); //sends the new asset back as a response
}
catch(error) { //error response if creating the asset fails
    res.status(500).json({
        message: "Could not create asset"
    });
}
}); 
    //PUT Route that updates an existing asset in the database
app.put("/api/assets/:id", async function(req, res) {
    try {
        const id=Number(req.params.id);
        const name = req.body.name;
        const category = req.body.category;
        const value = Number(req.body.value);
        if(!name || !category || value <=0) {
        return res.status(400).json({
            message: "Name,category,and a value greater than 0 are required"
        });
}
    //update the selected asset in the database
const updatedAsset = await prisma.asset.update({
    where: {
        id: id
    }, data: {
        name:name,
        category: category,
        value:value }
    });
    
    res.json(updatedAsset);
}
catch(error) {
    res.status(500).json({
        message: "Could not update asset"
    });
}
});
    //DELETE route that deletes an asset from the database
app.delete("/api/assets/:id", async function(req, res) {
    try{
        const id= Number(req.params.id);
        await prisma.asset.delete({
            where: {
                id: id
            }
        });
        res.json({
            message: "Asset deleted"
        });

            }
            catch(error) {
                res.status(500).json({
                    message: "Could not delete asset"
                });
            }
        });
        //handles unkown routes with a 404 error message
        app.use(function(req,res) {
            res.status(404).json({
                message: "Route not found"

            });
        });
    
//starts the server and listens for requests on port 3000
app.listen(PORT, function() {
    console.log("Server is running on http://localhost:" + PORT);
});