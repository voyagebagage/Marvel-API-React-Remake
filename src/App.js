import "./App.css";
import Characters from "./container/Characters";
import Comics from "./container/Comics";
import Favorites from "./container/Favorites";
import ComicsPerMarvel from "./container/ComicsPerMarvel";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import headerLogo from "./assets/img/headerLogo.png";

function App() {
  const [data, setData] = useState([]);
  const [skipCharacters, setSkipCharacters] = useState(0);
  const [skipComics, setSkipComics] = useState(0);
  const [limit, setLimit] = useState(16);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmitMarvel = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://marvel-api-node-oliv-dev.herokuapp.com/search-character?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skipCharacters}&name=${name}`
    );
    setData(response.data);
    setName("");
  };
  const handleSubmitComic = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://marvel-api-node-oliv-dev.herokuapp.com/search-comic?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skipComics}&title=${title}`
    );
    setData(response.data);
    setTitle("");
  };
  // const handleNextPageMarvel = () => {
  //   setSkip(skip + 16);
  // };

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
            skip={skipComics}
            setSkip={setSkipComics}
            limit={limit}
            setLimit={setLimit}
            title={title}
            setTitle={setTitle}
            handleSubmit={handleSubmitComic}
          />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>

        <Route path="/">
          <Characters
            data={data}
            setData={setData}
            skip={skipCharacters}
            setSkip={setSkipCharacters}
            limit={limit}
            setLimit={setLimit}
            name={name}
            setName={setName}
            handleSubmit={handleSubmitMarvel}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
