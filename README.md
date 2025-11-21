Crypto Conversor — Aplicação Full Stack

Este projeto é um conversor de criptomoedas com autenticação, favoritos e histórico de conversões.
O objetivo foi desenvolver uma aplicação completa, com backend em Node.js + Express e frontend em React, consumindo a API pública da CoinGecko.

🚀 Tecnologias utilizadas
Backend

Node.js

Express

MySQL

JWT (autenticação)

Bcrypt (hash de senha)

Axios (requisições à CoinGecko)

Frontend

React

Vite

Axios

TailwindCSS (estilização)

   Funcionalidades
   Autenticação

Cadastro de usuário

Login com JWT

Rotas protegidas no backend

  Conversão de Criptomoedas

Conversão de qualquer moeda suportada pela CoinGecko para BRL e USD

Valores atualizados em tempo real

   Favoritos

Salvar uma criptomoeda como favorita

Não permite duplicatas

Listagem dos favoritos

Remoção individual

   Histórico

Histórico de conversões do usuário

Listagem em ordem cronológica

Remoção individual

   Estrutura de Pastas
/crypto-conversor        → Backend
   /routes
   /middleware
   database.js
   server.js

/crypto_front            → Frontend
   /src
      /components
      /pages
      /services
      /styles

   Como rodar o projeto
📌 1. Clonar o repositório
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

▶ Backend
📌 2. Instalar dependências
cd crypto-conversor
npm install

📌 3. Configurar o banco de dados

Crie um banco chamado crypto no MySQL e execute:

Tabela users

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255)
);


Tabela history

CREATE TABLE history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  crypto_id VARCHAR(255),
  amount DECIMAL(18,8),
  value_br DECIMAL(18,8),
  value_usd DECIMAL(18,8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Tabela favorites

CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  crypto_id VARCHAR(255)
);

📌 4. Rodar o backend
node server.js


Backend rodando em:
📍 http://localhost:3001

   Frontend
📌 1. Instalar dependências
cd crypto_front
npm install

📌 2. Rodar o frontend
npm run dev


Frontend rodando em:
   http://localhost:5173

   Fluxo de Autenticação

O usuário faz login

O backend retorna um token JWT

O token é salvo no localStorage

Todas as rotas protegidas enviam o token no header "Authorization"

Se o token for inválido, o backend bloqueia a requisição

   Endpoints principais
Auth
Método	Rota	Descrição
POST	/auth/register	Cadastra usuário
POST	/auth/login	Login e retorno do token
Crypto
Método	Rota	Descrição
POST	/crypto/convert	Converte criptomoeda
GET	/crypto/history	Lista histórico
DELETE	/crypto/history/:id	Remove item do histórico
POST	/crypto/favorite	Salva favorito
GET	/crypto/favorite	Lista favoritos
DELETE	/crypto/favorite/:id	Remove favorito
   Decisões de implementação

O sistema não permite salvar a mesma moeda duas vezes nos favoritos.

No frontend, o usuário recebe um aviso quando tenta adicionar um favorito duplicado.

O backend valida TUDO novamente, garantindo segurança.

A conversão consulta diretamente a API pública da CoinGecko (dados em tempo real).

   Possíveis melhorias futuras

Integração com WebSockets para atualizar valores automaticamente

Configurar Docker para subir ambiente completo mais rápido

Criar dashboard com gráficos de variação das moedas

   Licença

Este projeto foi desenvolvido para fins de estudo e demonstração de habilidades técnicas.
