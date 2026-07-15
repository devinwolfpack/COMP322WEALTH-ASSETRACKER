type Asset = {
    id: number; name: string;
    category: string; value: number;
};
type AssetListProps= {
    assets: Asset[]; 
    editAsset: (asset: Asset) => void;
    deleteAsset: (id:number) => void;
};
export default function AssetList({
    assets,editAsset,deleteAsset}: AssetListProps) {
        return (
            <section>
                <h2>Assets</h2>
                <ul>
                    {assets.map(function(asset){
                        return (
                            <li key={asset.id}>
                                {asset.name}-{asset.category}-${asset.value.toFixed(2)}
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
