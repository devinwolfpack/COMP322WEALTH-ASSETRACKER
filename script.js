// Gets the form from the HTML using its id
// This is the form where the user types in asset information
const form = document.getElementById("assetForm");
// Gets the empty asset list from the HTML
// New assets will be added inside this list
const assetList = document.getElementById("assetList");
// Gets the total value display from the HTML
// JavaScript will update this number whenever assets are added or deleted
const totalValue = document.getElementById("totalValue");
// Creates an empty array to store all of the user's assets
// Each asset will be stored as an object inside this array
let assets = [];

getAssets(); // load assets from the server when the page first opens

// Adds an event listener to the form
// This code runs when the user clicks the Add Asset button
form.addEventListener("submit", function(event) {
  // Stops the page from refreshing when the form is submitted
  event.preventDefault();

  const name = document.getElementById("assetName").value;// Gets the asset name entered by the user
  const category = document.getElementById("assetCategory").value;// Gets the category selected by the user
   // Gets the asset value entered by the user
  // Number() converts the input from text into a number
  const value = Number(document.getElementById("assetValue").value);
// Creates an asset object that stores the name, category, and value together
  const asset = {
    name: name,
    category: category,
    value: value
  };

  addAsset(asset); //send the new asset to the server

  form.reset();// Clears the form fields so the user can enter another asset
});
  //gets all assets from the express server using the get route
  function getAssets() {
    fetch("/api/assets")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      assets = data;
      displayAssets();
    });
    }
    //sends a new asset to the express server using the post route
    function addAsset(asset) {
      fetch("/api/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(asset)
      })
    .then(function(response) {
      return response.json();
    })
    .then(function() {
      getAssets();
    });
    }
      //display all assets on the page and updates the total value
    function displayAssets() {
      assetList.innerHTML = "";
      let total = 0;

      for (let i = 0; i<assets.length; i++) {
        total = total + assets[i].value;
        const listItem = document.createElement("li");
        listItem.textContent = assets[i].name + " - " + assets[i].category +
        " - $" + assets[i].value.toFixed(2);
        assetList.appendChild(listItem);
      
      }
      totalValue.textContent = total.toFixed(2);
    }
  

 