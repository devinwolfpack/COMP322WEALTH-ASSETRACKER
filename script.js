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
// Checks localStorage to see if any assets were saved from a previous visit
// localStorage keeps data in the browser even after the page is refreshed or closed
const savedAssets = localStorage.getItem("assets");

if (savedAssets !== null) { // If saved assets exist in localStorage, load them back into the assets array
  assets = JSON.parse(savedAssets);  // Converts the saved text from localStorage back into a JavaScript array
  displayAssets();  // Displays the saved assets on the page
}
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

  assets.push(asset);  // Adds the new asset object to the assets array

  saveAssets();  // Saves the updated assets array to localStorage
  displayAssets();// Updates the asset list and total value shown on the page

  form.reset();// Clears the form fields so the user can enter another asset
});

function displayAssets() { // Displays all assets on the page and updates the total portfolio value
    // Clears the current list before rebuilding it
  // This prevents duplicate items from showing
  assetList.innerHTML = "";

  let total = 0;  // Starts the total value at 0

  for (let i = 0; i < assets.length; i++) {// Loops through every asset in the assets array
    total = total + assets[i].value;// Adds the current asset's value to the total

    const listItem = document.createElement("li");// Creates a new list item element for the asset
    // Adds the asset information and a delete button inside the list item
    
    
    listItem.innerHTML =// Adds the asset information and a delete button inside the list item
      assets[i].name +
      " - " +
      assets[i].category +
      " - $" +
      assets[i].value.toFixed(2) + // toFixed(2) makes the value display with 2 decimal places
      " <button class='delete-button' onclick='deleteAsset(" +
      i +
      ")'>Delete</button>"; // The delete button calls deleteAsset(i), where i is the asset's position in the array

    assetList.appendChild(listItem);// Adds the finished list item to the asset list on the page
  }

  totalValue.textContent = total.toFixed(2);  // Updates the total portfolio value shown on the page
  // toFixed(2) makes the total show 2 decimal places
}

function saveAssets() {// Saves the assets array to localStorage
  localStorage.setItem("assets", JSON.stringify(assets)); // localStorage can only store text, so JSON.stringify() converts the array into text
}

function deleteAsset(index) { // Deletes an asset from the assets array
  assets.splice(index, 1); // Removes 1 asset from the array at the selected index

  saveAssets(); // Saves the updated array after deleting the asset
  displayAssets(); // Refreshes the list and total value on the page
}