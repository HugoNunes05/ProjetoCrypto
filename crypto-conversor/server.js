const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/crypto', require('./routes/crypto'));

app.listen(3001, () => console.log("Backend rodando porta 3001"));