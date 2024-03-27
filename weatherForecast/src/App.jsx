import "./styles.css";
import icon from "./assets/sun-icon.png";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      <div className="container-login">
        <div className="login">
          <form className="login-form">
            <span className="login-form-title">Seja bem vindo</span>

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
              <button className="login-form-btn">Login</button>
            </div>

            <div className="no-account">
              <span className="question">Não possui conta?</span>

              <a href="#" className="create-account-btn">
                Criar agora
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
