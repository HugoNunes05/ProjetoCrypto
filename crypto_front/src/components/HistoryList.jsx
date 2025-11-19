import "../styles/dashboard.css";

export default function HistoryList({ list, onDelete }) {
    return (
        <div>
            <h3 className="card-title">Histórico</h3>
            <ul className="list">
                {list.map((h) => (
                    <li
                        key={h.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "8px 0"
                        }}
                    >
                        <div>
                            <b>{h.crypto_id}</b> — {h.amount}
                            <br />
                            R$ {h.value_br} / $ {h.value_usd}
                        </div>

                        <button
                            style={{
                                background: "#c62828",
                                color: "white",
                                border: "none",
                                padding: "6px 10px",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                            onClick={() => onDelete(h.id)}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
