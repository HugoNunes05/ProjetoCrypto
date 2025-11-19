export default function CryptoSelector({ value, onChange }) {
    const coins = ["bitcoin", "ethereum", "solana", "dogecoin", "cardano", "ripple"];

    return (
        <select value={value} onChange={e => onChange(e.target.value)}>
            {coins.map(c => (
                <option key={c} value={c}>
                    {c.toUpperCase()}
                </option>
            ))}
        </select>
    );
}
