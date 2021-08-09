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
  const [favCharacters, setFavCharacters] = useState([]);
  const [favComics, setFavComics] = useState([]);
  const [saveCharacterDetails, setSaveCharacterDetails] = useState({});

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

  return (
    <Router>
      <div className="header-logo-wrap wrapper">
        <img src={headerLogo} alt="logomarvel" id="headerLogo" />

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
            saveCharacterDetails={saveCharacterDetails}
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
            // favComics={favComics}
            // setFavComics={setFavComics}
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
            setSaveCharacterDetails={setSaveCharacterDetails}
            handleSubmit={handleSubmitMarvel}
            saveCharacterInFavoris={saveFavoris}
            // favCharacters={favCharacters}
            // setFavCharacters={setFavCharacters}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
