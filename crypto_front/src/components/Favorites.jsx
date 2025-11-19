export default function Favorites({ list, onSelect, onDelete }) {
    return (
        <div>
            <h3 className="card-title">Favoritos</h3>
            <ul className="list">
                {list.map((f) => (
                    <li
                        key={f.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "8px 0"
                        }}
                    >
                        <div
                            onClick={() => onSelect(f.crypto_id)}
                            style={{
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            {f.crypto_id}
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
                            onClick={() => onDelete(f.id)}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
