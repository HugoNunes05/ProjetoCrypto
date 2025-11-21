const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (email, password) VALUES (?,?)',
        [email, hash],
        (err) => {
            if (err) return res.status(400).json({ error: err });
            res.json({ message: 'Usuário criado' });
        }
    );
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, results) => {
            if (err || results.length === 0)
                return res.status(400).json({ error: "Usuário não encontrado" });

            const user = results[0];

            const valid = await bcrypt.compare(password, user.password);
            if (!valid)
                return res.status(400).json({ error: "Senha incorreta" });

            const token = jwt.sign({ id: user.id }, "SECRET_KEY");

            res.json({ token });
        }
    );
});

module.exports = router;
