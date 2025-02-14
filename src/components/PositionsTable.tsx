import { usePortfolioData } from "../hooks/usePortfolioData";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";

const PositionsTable: React.FC = () => {
    const { assets, positions, loading, error } = usePortfolioData();

    // console.log("Positions Data:", positions);
    //console.log("Assets Data:", assets);

    if (loading) return <p className="table-loading">Loading positions...</p>;
    if (error) return <p className="table-error">{error}</p>;
    if (!positions.length) return <p className="table-no-data">No positions available.</p>;

    return (
        <Container className="p-6">
            <Card className="positions-card">
                <h2 className="positions-title">📈 Portfolio Positions</h2>
                <div className="positions-table-container">
                    <table className="positions-table">
                        <thead>
                            <tr>
                                <th>Asset</th>
                                <th>Class</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {positions.map((pos, index) => {
                                const asset = assets.find((a) => a.id.toString() === pos.id.toString());
                                return (
                                    <tr key={pos.id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                                        <td className="asset-name">{asset ? asset.name : `⚠ Unknown (ID: ${pos.asset})`}</td>
                                        <td className="asset-class">{asset ? asset.type.charAt(0).toUpperCase() + asset.type.slice(1) : "N/A"}</td>
                                        <td className="quantity">{pos.quantity}</td>
                                        <td className="price">${pos.price.toFixed(2)}</td>
                                        <td className="total-value">${(pos.quantity * pos.price).toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </Container>
    );
};

export default PositionsTable;
