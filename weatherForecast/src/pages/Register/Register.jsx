import { useState } from "react";
import { DefaultComponents } from "../../components/DefaultComponents";

import icon from "../../assets/sun-icon.png";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data); // Processar a resposta
    } catch (error) {
      console.error("Falha ao registrar", error);
    }
  };

  return (
    <DefaultComponents>
      <form className="login-form" onSubmit={handleSubmit}>
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
          <button className="login-form-btn">Criar conta</button>
        </div>

        <div className="no-account">
          <span className="question">Já possui conta?</span>

          <a href="/login" className="create-account-btn">
            Criar conta
          </a>
        </div>
      </form>
    </DefaultComponents>
  );
};

// import { useState } from "react";
// import { DefaultComponents } from "../../components/DefaultComponents";

// import icon from "../../assets/sun-icon.png";

// export const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   return (
//     <DefaultComponents>
//       <form className="login-form">
//         <span className="login-form-title">Criar conta</span>

//         <span className="login-form-title">
//           <img src={icon} alt="" />
//         </span>

//         <div className="input-field">
//           <input
//             className={email !== "" ? "not-empty input" : "input"}
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <span className="focus-input" data-placeholder="Email"></span>
//         </div>

//         <div className="input-field">
//           <input
//             className={password !== "" ? "not-empty input" : "input"}
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <span className="focus-input" data-placeholder="Senha"></span>
//         </div>

//         <div className="container-login-form-btn">
//           <button className="login-form-btn">Criar conta</button>
//         </div>

//         <div className="no-account">
//           <span className="question">Já possui conta?</span>

//           <a href="/login" className="create-account-btn">
//             Fazer login
//           </a>
//         </div>
//       </form>
//     </DefaultComponents>
//   );
// };
