import "./index.css";

import { Link } from "react-router-dom";
//assets
import headerLogo from "../../assets/img/headerLogo.png";

export default function Header({
  token,
  username,
  setLimit,
  handleClickLogOut,
}) {
  return (
    <div className="skybox-wrapper wrapper">
      <div className="header-logo-wrap wrapper">
        <Link to="/">
          <img src={headerLogo} alt="logomarvel" id="headerLogo" />
        </Link>
        {token ? (
          <p>
            Welcome on my marvel API {username}, enjoy
            <input type="button" value="log-out" onClick={handleClickLogOut} />
          </p>
        ) : (
          <p>
            <Link className="noDecoration" to="/logIn">
              Log-in/Sign-up
            </Link>
          </p>
        )}

        <div className="menu">
          <p>
            <Link className="noDecoration" to="/" onClick={() => setLimit(16)}>
              Characters
            </Link>
          </p>
          <p>
            <Link className="noDecoration" to="/comics">
              Comics
            </Link>
          </p>
          <p>
            <Link className="noDecoration" to="/favorites">
              Favorites
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
