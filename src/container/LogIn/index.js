import "./index.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LogIn({ setUser }) {
  const [firstField, setFirstField] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (firstField && password) {
      try {
        const response = await axios.post(
          "https://marvel-api-node-oliv-dev.herokuapp.com/user/find",
          { firstField: firstField, password: password }
        );
        // console.log(response.data);
        if (response.data.token) {
          setUser(response.data.token, response.data.username);
          history.push("/");
        } else {
          alert("error");
        }
        // alert("t'es logé esti 🎉  ");
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  };
  // console.log(response.data);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ position: "absolute", top: "40%" }}
        className="login-page"
      >
        <input
          autoFocus
          placeholder="email or username"
          type="text"
          onChange={(e) => setFirstField(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Log In" />
        <span>
          or{" "}
          <Link className="link-text" to="/signUp">
            create an account
          </Link>
        </span>
      </form>
    </>
  );
}

export default LogIn;
