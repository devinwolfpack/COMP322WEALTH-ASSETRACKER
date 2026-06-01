const form = document.getElementById("assetForm");
const assetList = document.getElementById("assetList");
const totalValue = document.getElementById("totalValue");

let assets = [];

const savedAssets = localStorage.getItem("assets");

if (savedAssets !== null) {
  assets = JSON.parse(savedAssets);
  displayAssets();
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("assetName").value;
  const category = document.getElementById("assetCategory").value;
  const value = Number(document.getElementById("assetValue").value);

  const asset = {
    name: name,
    category: category,
    value: value
  };

  assets.push(asset);

  saveAssets();
  displayAssets();

  form.reset();
});

function displayAssets() {
  assetList.innerHTML = "";

  let total = 0;

  for (let i = 0; i < assets.length; i++) {
    total = total + assets[i].value;

    const listItem = document.createElement("li");

    listItem.innerHTML =
      assets[i].name +
      " - " +
      assets[i].category +
      " - $" +
      assets[i].value.toFixed(2) +
      " <button class='delete-button' onclick='deleteAsset(" +
      i +
      ")'>Delete</button>";

    assetList.appendChild(listItem);
  }

  totalValue.textContent = total.toFixed(2);
}

function saveAssets() {
  localStorage.setItem("assets", JSON.stringify(assets));
}

function deleteAsset(index) {
  assets.splice(index, 1);

  saveAssets();
  displayAssets();
}