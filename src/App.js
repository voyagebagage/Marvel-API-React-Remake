import "./App.css";
import Characters from "./container/Characters";
import Comics from "./container/Comics";
import Favorites from "./container/Favorites";
import ComicsPerMarvel from "./container/ComicsPerMarvel";
import LogIn from "./container/LogIn";
import SignUp from "./container/SignUp";

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
  const [favCharacters, setFavCharacters] = useState([]);
  const [favComics, setFavComics] = useState([]);
  const [characterDetails, setCharacterDetails] = useState({});
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  //_________________________________________________________________
  const handleSubmitMarvel = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://marvel-api-node-oliv-dev.herokuapp.com/search-character?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skipCharacters}&name=${name}`
    );
    setData(response.data);
    setName("");
  };

  //_________________________________________________________________
  const handleSubmitComic = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://marvel-api-node-oliv-dev.herokuapp.com/search-comic?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skipComics}&title=${title}`
    );
    setData(response.data);
    setTitle("");
  };
  // =================================================================
  const saveFavoris = async (item, whereFrom) => {
    try {
      let newTab =
        whereFrom === "character"
          ? [...favCharacters]
          : whereFrom === "comic"
          ? [...favComics]
          : null;

      let alreadyInLocalStorage = false;
      newTab.forEach((e) => {
        if (e._id === item._id) {
          alreadyInLocalStorage = true;
        }
      });

      if (alreadyInLocalStorage) {
        alert("nope already Fave");
      } else {
        if (whereFrom === "character") {
          favCharacters.push(item);
          const stringFav = JSON.stringify(favCharacters);

          await localStorage.setItem("favoneMarvels", stringFav);
        } else if (whereFrom === "comic") {
          favComics.push(item);
          const stringFav = JSON.stringify(favComics);

          await localStorage.setItem("favComics", stringFav);
          alert("succes update");
        }
      }
    } catch (error) {
      console.log("-------------you got a saving issue!-----------");
    }
    console.log("Done.");
  };
  // =================================================================
  const handleClickLogOut = () => {
    setUsername("");
    setToken("");
  };

  return (
    <Router>
      <div className="header-logo-wrap wrapper">
        <img src={headerLogo} alt="logomarvel" id="headerLogo" />
        {token ? (
          <p>
            Welcome on my marvel API {username}, enjoy
            <input type="button" value="log-out" onClick={handleClickLogOut} />
          </p>
        ) : (
          <p>
            <Link to="/logIn">Log-in/Sign-up</Link>
          </p>
        )}

        <div className="menu">
          <p>
            <Link to="/" onClick={() => setLimit(16)}>
              Characters
            </Link>
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
          <ComicsPerMarvel
            saveComicInFavoris={saveFavoris}
            characterDetails={characterDetails}
          />
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
            saveComicInFavoris={saveFavoris}
          />
        </Route>
        <Route path="/favorites">
          <Favorites
            favComics={favComics}
            setFavComics={setFavComics}
            favCharacters={favCharacters}
            setFavCharacters={setFavCharacters}
          />
        </Route>
        <Route path="/logIn">
          <LogIn setToken={setToken} setUsername={setUsername} />
        </Route>
        <Route path="/signUp">
          <SignUp />
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
            setCharacterDetails={setCharacterDetails}
            handleSubmit={handleSubmitMarvel}
            saveCharacterInFavoris={saveFavoris}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
