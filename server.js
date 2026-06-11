const express = require("express");
const path = require("path");


const app= express();
const PORT = 3000;

let assets =[];

app.use(express.json());

app.use(function(req,res,next) {
    console.log(req.method + " request to " + req.url);
    next();

});

app.use(express.static(path.join(__dirname)));

app.get("/api/assets", function(req, res) {
    res.json(assets);
});

app.post("/api/assets", function(req,res) {
    const newAsset = {
        name: req.body.name,
        category: req.body.category,
        value: Number(req.body.value)
    };
    assets.push(newAsset);

    res.json(newAsset);
});

app.listen(PORT, function() {
    console.log("Server is running on http://localhost:" + PORT);
});