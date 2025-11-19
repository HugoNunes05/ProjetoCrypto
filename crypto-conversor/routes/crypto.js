const express = require('express');
const axios = require('axios');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../database');

router.post('/convert', auth, async (req, res) => {
    const { crypto_id, amount } = req.body;

    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${crypto_id}&vs_currencies=usd,brl`
        );

        const prices = response.data[crypto_id];
        const brl = prices.brl * amount;
        const usd = prices.usd * amount;

        db.query(
            'INSERT INTO history (user_id, crypto_id, amount, value_br, value_usd) VALUES (?,?,?,?,?)',
            [req.userId, crypto_id, amount, brl, usd]
        );

        res.json({ brl, usd });

    } catch (error) {
        res.status(500).json({ error: "Erro ao consultar CoinGecko" });
    }
});

router.get('/history', auth, (req, res) => {
    db.query(
        'SELECT * FROM history WHERE user_id = ? ORDER BY created_at DESC',
        [req.userId],
        (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json(results);
        }
    );
});

router.delete('/history/:id', auth, (req, res) => {
    db.query(
        'DELETE FROM history WHERE id = ? AND user_id = ?',
        [req.params.id, req.userId],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Item do histórico removido!" });
        }
    );
});

router.post('/favorite', auth, (req, res) => {
    const { crypto_id } = req.body;

    db.query(
        'SELECT * FROM favorites WHERE user_id = ? AND crypto_id = ?',
        [req.userId, crypto_id],
        (err, results) => {
            if (err) return res.status(500).json({ error: "Erro no banco" });

            if (results.length > 0) {
                return res.status(400).json({ error: "Moeda já está nos favoritos" });
            }

            db.query(
                'INSERT INTO favorites (user_id, crypto_id) VALUES (?, ?)',
                [req.userId, crypto_id],
                (err) => {
                    if (err) return res.status(500).json({ error: "Erro ao salvar" });
                    res.json({ message: "Favorito salvo!" });
                }
            );
        }
    );
});

router.get('/favorite', auth, (req, res) => {
    db.query(
        'SELECT id, crypto_id FROM favorites WHERE user_id = ?',
        [req.userId],
        (err, results) => {
            if (err) return res.status(500).json({ error: err });
            res.json(results);
        }
    );
});

router.delete('/favorite/:id', auth, (req, res) => {
    db.query(
        'DELETE FROM favorites WHERE id = ? AND user_id = ?',
        [req.params.id, req.userId],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Favorito removido!" });
        }
    );
});

module.exports = router;
