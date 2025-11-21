const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/crypto', require('./routes/crypto'));

const PORT = 3001; 
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
