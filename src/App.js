import "./App.css";
import Characters from "./container/Characters";
import Comics from "./container/Comics";
import Favorites from "./container/Favorites";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import headerLogo from "./assets/img/headerLogo.png";

function App() {
  return (
    <Router>
      <div className="header-logo-wrap wrapper">
        <img src={headerLogo} alt="logomarvel" id="headerLogo" />

        <ul className="menu">
          <p>
            <Link to="/">Characters</Link>
          </p>
          <p>
            <Link to="/comics">Comics</Link>
          </p>
          <p>
            <Link to="/favorites">Favorites</Link>
          </p>
        </ul>
      </div>

      <Switch>
        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/">
          <Characters />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
