type Asset = {
    id: number; name: string;
    category: string; value: number;
};
type AssetListProps= {
    assets: Asset[]; 
    editAsset: (asset: Asset) => void;
    deleteAsset: (id:number) => void;
    bitcoinPrice: number|null;
    ethereumPrice: number|null;
};
export default function AssetList({
    assets,editAsset,deleteAsset,bitcoinPrice,ethereumPrice}: AssetListProps) {
        return (
            <section>
                <h2>Assets</h2>
                <ul>
                    {assets.map(function(asset){
                        const assetName = asset.name.trim().toLowerCase();
                        let displayedValue = asset.value;
                        if( (assetName==="bitcoin" || assetName ==="btc") &&
                        bitcoinPrice!==null){
                            displayedValue = asset.value*bitcoinPrice;
                        
                        }
                        if((assetName === "ethereum" || assetName === "eth") &&
                        ethereumPrice !== null) {
                            displayedValue=asset.value* ethereumPrice;
                        }
                        return (
                            <li key={asset.id}>
                                {assetName === "bitcoin" || assetName ==="btc" || assetName==="ethereum" || assetName
                                 ==="eth" ? asset.name + " - " +asset.category + " - Quantity: " + asset.value +
                                 " - Current Value: $" +displayedValue.toFixed(2) : asset.name +
                                 " - " + asset.category + " - Value: $" + displayedValue.toFixed(2) }

                                <button
                                type="button"
                                onClick={function(){
                                    editAsset(asset);
                                }}
                                >
                                    Edit
                                </button>
                                <button
                                type="button"
                                onClick={function(){
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
        );
    }
