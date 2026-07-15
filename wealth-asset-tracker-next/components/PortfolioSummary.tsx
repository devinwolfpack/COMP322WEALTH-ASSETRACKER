type PortfolioSummaryProps = {
    totalValue: number;
};

export default function PortfolioSummary({ totalValue}: PortfolioSummaryProps) {
    return (
        <section>
            <h2>Total Portfolio Value</h2>
            <p>${totalValue.toFixed(2)}</p>
        </section>
    );
}