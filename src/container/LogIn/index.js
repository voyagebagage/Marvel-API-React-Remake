import "./index.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LogIn({ setToken, setUsername }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post(
          "https://marvel-api-node-oliv-dev.herokuapp.com/user/find",
          { email: email, password: password }
        );
        console.log(response.data);
        if (response) {
          setToken(response.data.token);
          setUsername(response.data.username);
        }

        alert("t'es logé esti 🎉  ");
        history.push("/");
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  };
  // console.log(response.data);

  return (
    <div className="login-page wrapper">
      <form onSubmit={handleSubmit}>
        <input
          //   id="input"
          placeholder="email or username"
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
