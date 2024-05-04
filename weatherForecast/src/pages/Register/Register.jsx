import { useState } from "react";
import { DefaultComponents } from "../../components/DefaultComponents";
import { Pool } from "pg";

import icon from "../../assets/sun-icon.png";

const pool = new Pool({
  user: "seuusuario",
  host: "localhost",
  database: "email",
  password: "password",
  port: 5432,
});

const query = "INSERT INTO usuarios (email, senha) VALUES ($1, $2)";
const values = ["user@example.com", "password123"];
await pool.query(query, values);
console.log("Usuário registrado com sucesso!");

const handleRegister = async () => {
  try {
    const query = "INSERT INTO usuarios (email, senha) VALUES ($1, $2, $3)";
    await pool.query(query, values);
    console.log("Usuário registrado com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir usuário:", error);
  }
};

pool.end();

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <DefaultComponents>
      <form className="login-form">
        <span className="login-form-title">Criar conta</span>

        <span className="login-form-title">
          <img src={icon} alt="" />
        </span>

        <div className="input-field">
          <input
            className={email !== "" ? "not-empty input" : "input"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="input-field">
          <input
            className={password !== "" ? "not-empty input" : "input"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Senha"></span>
        </div>

        <div className="container-login-form-btn">
          <button onClick={handleRegister} className="login-form-btn">
            Criar conta
          </button>
        </div>

        <div className="no-account">
          <span className="question">Já possui conta?</span>

          <a href="/login" className="create-account-btn">
            Fazer login
          </a>
        </div>
      </form>
    </DefaultComponents>
  );
};
