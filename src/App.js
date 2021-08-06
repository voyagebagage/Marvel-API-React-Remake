import "./App.css";
import Characters from "./container/Characters";
import Comics from "./container/Comics";
import Favorites from "./container/Favorites";
import ComicsPerMarvel from "./container/ComicsPerMarvel";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";

import headerLogo from "./assets/img/headerLogo.png";

function App() {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  return (
    <Router>
      <div className="header-logo-wrap wrapper">
        <img src={headerLogo} alt="logomarvel" id="headerLogo" />

        <div className="menu">
          <p>
            <Link to="/">Characters</Link>
          </p>
          <p>
            <Link to="/comics">Comics</Link>
          </p>
          <p>
            <Link to="/favorites">Favorites</Link>
          </p>
        </div>
      </div>

      <Switch>
        <Route path="/comics/:characterId">
          <ComicsPerMarvel />
        </Route>
        <Route path="/comics">
          <Comics
            data={data}
            setData={setData}
            skip={skip}
            setSkip={setSkip}
            limit={limit}
            setLimit={setLimit}
          />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>

        <Route path="/">
          <Characters
            data={data}
            setData={setData}
            skip={skip}
            setSkip={setSkip}
            limit={limit}
            setLimit={setLimit}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
