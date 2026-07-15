type AssetFormProps = {
    name: string;
    category: string;
    value: string;
    editingAssetId: number | null;
    setName: (name: string) => void;
    setCategory: (name:string) =>void;
    setValue: (value: string) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
export default function AssetForm ({
    name,
    category,
    value,
    editingAssetId,
    setName,
    setCategory,
    setValue,
    handleSubmit,
}: AssetFormProps) {
    return (
        <section>
            <h2>Add or Edit Asset</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Asset name"
                value={name}
                onChange={function(event){
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
                onChange={function(event){
                    setValue(event.target.value);
                }}
                />
                <button type="submit">
                    {editingAssetId ===null ? "Add Asset" : "Update Asset"}
                </button>
            </form>
        </section>
    );
}
