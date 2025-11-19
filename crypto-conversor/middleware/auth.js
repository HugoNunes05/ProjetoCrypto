const { error } = require('console');
const jwt = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ error: "Token obrigatório"});

    try{
        const decoded = jwt.verify(token, "SECRET_KEY");
        req.userId = decoded.id;
        next();
    }catch{
        res.status(401).json({ error: "Token inválido"});
    }
}

module.exports = auth;