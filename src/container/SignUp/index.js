import "./index.css";

import { useHistory } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

function SignUp({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://marvel-api-node-oliv-dev.herokuapp.com/user/create",
            { username: username, email: email, password: password }
          );
          // console.log(response.data.token);
          if (response.data.token) {
            setUser(response.data.token, response.data.username);
            history.push("/");
          } else {
            alert("error");
          }
        } catch (error) {
          console.log(error.message);
        }
      } else {
        alert("password aren't the same");
      }
    } else {
      alert("missing field(s)");
    }
  };

  return (
    <div
      style={{ position: "absolute", top: 80 }}
      className="signUp-page wrapper"
    >
      {/* <span>under construction, back undone</span> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input type="submit" value="Sign up and welcome" />
      </form>
    </div>
  );
}

export default SignUp;
