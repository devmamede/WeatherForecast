import { useState } from "react";
import "../../global.css";
import icon from "../../assets/sun-icon.png";
import { DefaultComponents } from "../../components/DefaultComponents";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <DefaultComponents>
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
          <a href="/homepage" className="login-form-btn">
            Login
          </a>
        </div>

        <div className="no-account">
          <span className="question">Não possui conta?</span>

          <a href="/register" className="create-account-btn">
            Criar agora
          </a>
        </div>
      </form>
    </DefaultComponents>
  );
};
