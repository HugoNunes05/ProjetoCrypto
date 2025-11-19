import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    await api.post("/auth/register", { email, password });
    alert("Usuário registrado!");
    navigate("/");
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Criar Conta</h1>

        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="auth-button" onClick={handleRegister}>
          Registrar
        </button>

        <Link to="/" className="auth-link">
          Voltar
        </Link>
      </div>
    </div>
  );
}
