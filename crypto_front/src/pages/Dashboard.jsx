import { useState, useEffect } from "react";
import api from "../services/api";
import CryptoSelector from "../components/CryptoSelector";
import HistoryList from "../components/HistoryList";
import Favorites from "../components/Favorites";
import "../styles/dashboard.css";

export default function Dashboard() {
    const [crypto, setCrypto] = useState("bitcoin");
    const [amount, setAmount] = useState("");
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [favorites, setFavorites] = useState([]);

    async function convert() {
        const res = await api.post("/crypto/convert", {
            crypto_id: crypto,
            amount: Number(amount)
        });

        setResult(res.data);
        loadHistory();
    }

    async function loadHistory() {
        const res = await api.get("/crypto/history");
        setHistory(res.data);
    }

    async function loadFavorites() {
        const res = await api.get("/crypto/favorite");
        setFavorites(res.data);
    }


    async function saveFavorite() {
    try {
        await api.post("/crypto/favorite", { crypto_id: crypto });
        loadFavorites();
        alert("Favorito salvo!");
    } catch (error) {
        if (error.response && error.response.data.error === "Moeda já está nos favoritos") {
            alert("Você já favoritou essa moeda!");
        } else {
            alert("Erro ao salvar favorito!");
            }
        }
    }

    async function deleteHistoryItem(id) {
        await api.delete(`/crypto/history/${id}`);
        loadHistory();
    }

    async function deleteFavoriteItem(id) {
        await api.delete(`/crypto/favorite/${id}`);
        loadFavorites();
    }

    useEffect(() => {
        loadHistory();
        loadFavorites();
    }, []);

    return (
        <div className="dashboard-container">

            <div className="card">
                <h1 className="card-title">Conversor de Criptomoedas</h1>

                <CryptoSelector value={crypto} onChange={setCrypto} />

                <input
                    className="input"
                    placeholder="Quantidade"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />

                <button className="button" onClick={convert}>Converter</button>
                <button className="button" onClick={saveFavorite}>Favoritar</button>

                {result && (
                    <div style={{ marginTop: 20 }}>
                        <p>R$ {result.brl}</p>
                        <p>$ {result.usd}</p>
                    </div>
                )}
            </div>

            <div className="card">
                <Favorites 
                    list={favorites} 
                    onSelect={setCrypto}
                    onDelete={deleteFavoriteItem}
                />
            </div>

            <div className="card">
                <HistoryList 
                    list={history} 
                    onDelete={deleteHistoryItem} 
                />
            </div>

        </div>
    );
}
