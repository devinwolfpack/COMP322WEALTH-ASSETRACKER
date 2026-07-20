type MarketDataProps = {
    bitcoinPrice: number | null;
    bitcoinChange: number | null;
    ethereumPrice: number | null;
    ethereumChange: number | null;
};
export default function MarketData({
    bitcoinPrice,
    bitcoinChange,
    ethereumPrice,
    ethereumChange
}: MarketDataProps) {
    return (
        <section>
            <h2>External Market Data</h2>
            <p>This section uses a third-party market API to show live crypto prices.</p>
            <ul>
                <li>
                    Bitcoin -{" "}
                    {bitcoinPrice === null ? "Loading..." : "$" + bitcoinPrice.toFixed(2)}
                    {" | 24h Change: "}
                    {bitcoinChange === null ? "Loading..." : bitcoinChange.toFixed(2) + "%"}
                </li>
                <li>
                    Ethereum -{" "}
                    {ethereumPrice === null ? "Loading..." : "$" + ethereumPrice.toFixed(2)}
                    {" | 24h Change: "}
                    {ethereumChange === null ? "Loading..." : ethereumChange.toFixed(2) + "%"}
                </li>
            </ul>
        </section>
    );
}