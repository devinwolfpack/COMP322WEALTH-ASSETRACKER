// Gets the form from the HTML using its id
// This is the form where the user types in asset information
const form = document.getElementById("assetForm");
// Gets the empty asset list from the HTML
// New assets will be added inside this list
const assetList = document.getElementById("assetList");
// Gets the total value display from the HTML
// JavaScript will update this number whenever assets are added,edited or deleted
const totalValue = document.getElementById("totalValue");
// Creates an empty array to store all of the user's assets
// the array gets filled with asset data from the express server
let assets = [];
//keeps track of which asset is currently being edited,
//when the value is null the form will add a new asset instead of editing
let editingAssetId = null;

getAssets(); // load assets from the server when the page first opens

// Adds an event listener to the form
// This code runs when the user submits the asset form
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
  //if editingAssetId is null no asset is being edited
  //then the form will add a new asset
  if (editingAssetId ===null) {
      addAsset(asset); //send the new asset to the server
  } else {
    //if editingAssetId has a value update the selected asset instead
    updateAsset(editingAssetId,asset); 
    editingAssetId = null; //resets editingAssetId back to null after the update is sent
  }

  form.reset();// Clears the form fields so the user can enter another asset
});
  //gets all assets from the express server using the get route
  function getAssets() {
    fetch("/api/assets") //sends a get request to the backend API route
    .then(function(response) {
      //converts server response into js data
      return response.json();
    })
    .then(function(data) {
      //stores the data from the server in the assets array
      assets = data;
      displayAssets(); //update the asset list shown on the page
    });
    }
    //sends a new asset to the express server using the post route
    function addAsset(asset) {
      fetch("/api/assets", { //sends the asset object to the backend api route
        method: "POST", //post is used to create a new record
        //tells the server that the request body contains JSON data
        headers: {
          "Content-Type": "application/json"
        },
        //converts the asset object into JSON text before sending it
        body: JSON.stringify(asset)
      })
    .then(function(response) {
      //converts the server response into js data
      return response.json();
    })
    .then(function() {
      //realods the assets from the database after adding a new one
      getAssets();
    });
    }
      //display all assets on the page and updates the total value
    function displayAssets() {
      //clears the current list before rebuilding it
      assetList.innerHTML = "";
      let total = 0; //total portfolio value starts at 0

      for (let i = 0; i<assets.length; i++) { //loops through every asset in the asset array
        total = total + assets[i].value; //adds the current asset's value to the total
        const listItem = document.createElement("li"); //creates new list item for the asset
        //adds the asset info, edit button and delete button to the list item
        listItem.innerHTML = assets[i].name + " - " + assets[i].category + 
        " $" + assets[i].value.toFixed(2) + " <button onclick='editAsset("
        + assets[i].id+ ")'>Edit</button>" + " <button class ='delete-button' onclick='deleteAsset("
        +assets[i].id + ")'>Delete</button>";
       //adds the finished list item to the page
        assetList.appendChild(listItem);
      
      }
      //updates the total value display on the page
      //tofixed 2 makes the total show two decimal places
      totalValue.textContent = total.toFixed(2);
    }
    //deletes an asset from the database using the DELETE route
  function deleteAsset(id) {
    //sends a delete request to the backend using the selected asset id
    fetch("/api/assets/" +id, { method: "DELETE" 
    })
    .then(function(response) { //converts server response into js data
      return response.json();
    })
    .then(function() { getAssets(); //realods the assets from the database after deleting one
    });
    }
    //prepares an existing asset to be edited
    function editAsset(id) {
      //find the asset in the assets array that matches the select id
      const assetToEdit = assets.find(function(asset) {
        return asset.id === id;
      });//puts the selected assets info into the form
       document.getElementById("assetName").value = assetToEdit.name;
      document.getElementById("assetCategory").value = assetToEdit.category;
      document.getElementById("assetValue").value = assetToEdit.value;
      editingAssetId = id;
      } //updates an existing asset in the database using the PUT route
      function updateAsset(id,asset) {
        fetch("/api/assets/" + id, { method : "PUT", headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(asset)
        })
        .then(function(response) {
          return response.json();
        })
        .then(function() {
          getAssets(); //reloads the assets from the database after updating one

        });
        }
      