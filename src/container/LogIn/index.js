import "./index.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      alert("t'es logé esti 🎉  ");
    }
  };

  return (
    <div className="login-page wrapper">
      <span>the back is not done yet</span>
      <form onSubmit={handleSubmit}>
        <input
          //   id="input"
          placeholder="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          //   id="input"
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Log In" />
        <span>
          or
          <Link to="/signUp"> create an account</Link>
        </span>
      </form>
    </div>
  );
}

export default LogIn;
