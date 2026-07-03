"use client";
import { useEffect, useState } from "react";

type Asset = {
  id:number; name: string; category: string; value: number;
};
export default function Home() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [editingAssetId, setEditingAssetId] = useState<number | null>(null);
  useEffect(function() {
    getAssets();
  }, []);
  function getAssets() {
    fetch("/api/assets")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      setAssets(data);
    });
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const asset = {
      name: name,
      category: category,
      value: Number(value)
    };
    if (editingAssetId === null) {
      addAsset(asset);
    } else {
      updateAsset(editingAssetId, asset);
      setEditingAssetId(null);
    }
    setName("");
    setCategory("");
    setValue("");
    }
    function addAsset(asset: { name: string; category: string; value: number}) {
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
      function editAsset(asset: Asset) {
        setName(asset.name);
        setCategory(asset.category);
        setValue(String(asset.value));
        setEditingAssetId(asset.id);
      }
      function updateAsset(id: number,
        asset: { name: string; category: string; value: number}
      ) {
        fetch("/api/assets/" + id, {
          method: "PUT",
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

          })
          }
          function deleteAsset(id: number) {
            fetch("/api/assets/" + id, {
              method: "DELETE" })
              .then(function(response) {
                return response.json();
              })
              .then(function() {
                getAssets();
              });
              }
              const totalValue = assets.reduce(function(total,asset) {
                return total + asset.value;
              }, 0);
              return (
                <main>
                  <header>
                    <h1>Wealth Asset Tracker</h1>
                    <p>Track your assets and total portfolio value.</p>
                  </header>
                  <section>
                    <h2>Add or Edit Asset</h2>
                    <form onSubmit={handleSubmit}>
                      <input
                      type="text"
                      placeholder="Asset name"
                      value={name}
                      onChange={function(event) {
                        setName(event.target.value);
                      }}
                      />
                      <input
                      type="text"
                      placeholder="Category"
                      value={category}
                      onChange={function(event) {
                        setCategory(event.target.value);
                      }}
                      />
                      <input
                      type="number"
                      placeholder="Value"
                      value={value}
                      onChange={function(event) {
                        setValue(event.target.value);
                      }}
                      />
                      <button type="submit">
                        {editingAssetId ===null ? "Add Asset" : "Update Asset"}
                      </button>
                    </form>
                  </section>
                  <section>
                    <h2>Total Portfolio Value</h2>
                    <p>${totalValue.toFixed(2)}</p>
                  </section>
                  <section>
                    <h2>Assets</h2>
                    <ul>
                      {assets.map(function(asset) {
                        return (
                          <li key={asset.id}>
                            {asset.name} - {asset.category} - ${asset.value.toFixed(2)}
                            <button
                            type="button"
                            onClick={function() {
                              editAsset(asset);

                            }}
                            >
                              Edit
                            </button>
                            <button
                            type="button"
                            onClick={function() {
                              deleteAsset(asset.id);
                            }}
                            >
                              Delete
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                </main>
              
              );
            }
       