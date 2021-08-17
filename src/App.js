//THREEJS

//project imports
import "./App.css";
import FirstLoader from "./components/FirstLoader";
import Header from "./components/Header";
import Characters from "./container/Characters";
import Comics from "./container/Comics";
import Favorites from "./container/Favorites";
import ComicsPerMarvel from "./container/ComicsPerMarvel";
import LogIn from "./container/LogIn";
import SignUp from "./container/SignUp";

//React imports
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

//package imports
import axios from "axios";
import Cookies from "js-cookie";
//assets
//fontawesome import
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);

function App() {
  const [dataCharacters, setDataCharacters] = useState([]);
  const [dataComics, setDataComics] = useState([]);
  const [skipCharacters, setSkipCharacters] = useState(0);
  const [skipComics, setSkipComics] = useState(0);
  const [limit, setLimit] = useState(16);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [favCharacters, setFavCharacters] = useState([]);
  const [favComics, setFavComics] = useState([]);
  const [characterDetails, setCharacterDetails] = useState({});
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(Cookies.get("username") || "");

  // =================================================================

  // =================================================================
  const handleClickLogOut = () => {
    setToken(null);
    setUsername("");
    Cookies.remove("token");
    Cookies.remove("username");
  };
  //_________________AUTH________________________________________________
  const setUser = (userToken, username) => {
    setToken(userToken);
    setUsername(username);
    Cookies.set("token", userToken, { expires: 1 });
    Cookies.set("username", username, { expires: 1 });
  };
  //____________SEARCH_CHARACTERS___________________________________________________
  const handleSubmitMarvel = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://marvel-api-node-oliv-dev.herokuapp.com/search-character?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skipCharacters}&name=${name}`
    );
    setDataCharacters(response.data.results);
    setName("");
  };

  //_____________SEARCH_COMICS_________________________________________________
  const handleSubmitComic = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://marvel-api-node-oliv-dev.herokuapp.com/search-comic?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skipComics}&title=${title}`
    );
    setDataComics(response.data.results);
    setTitle("");
  };

  // =================================================================
  const updateFavoris = async (item, whereFrom) => {
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

      //REMOVE FAV <----------------------------------------------------
      if (alreadyInLocalStorage) {
        if (whereFrom === "character") {
          newTab.splice(favCharacters.indexOf(item), 1);
          await setFavCharacters(newTab);
          await localStorage.setItem(
            "favMarvels",
            JSON.stringify(favCharacters)
          );
        } else if (whereFrom === "comic") {
          newTab.splice(favComics.indexOf(item), 1);
          await setFavComics(newTab);
          await localStorage.setItem("favComics", JSON.stringify(favComics));
        }

        //ADD FAV <----------------------------------------------------
      } else {
        if (whereFrom === "character") {
          favCharacters.push(item);
          const stringFav = JSON.stringify(favCharacters);
          await localStorage.setItem("favMarvels", stringFav);
        } else if (whereFrom === "comic") {
          favComics.push(item);
          const stringFav = JSON.stringify(favComics);
          await localStorage.setItem("favComics", stringFav);
        }
      }
    } catch (error) {
      console.log("-------------you got a saving issue!-----------");
    }
    console.log("Done.");
  };
  // =================================================================

  return (
    <>
      <FirstLoader />
      <Router>
        <Header
          token={token}
          username={username}
          setLimit={setLimit}
          handleClickLogOut={handleClickLogOut}
        />
        <Switch>
          <Route path="/comics/:characterId">
            <ComicsPerMarvel
              updateFavoris={updateFavoris}
              characterDetails={characterDetails}
            />
          </Route>
          <Route path="/comics">
            <Comics
              data={dataComics}
              setData={setDataComics}
              skip={skipComics}
              setSkip={setSkipComics}
              limit={limit}
              setLimit={setLimit}
              title={title}
              setTitle={setTitle}
              handleSubmit={handleSubmitComic}
              updateComicInFavoris={updateFavoris}
            />
          </Route>
          <Route path="/favorites">
            <Favorites
              token={token}
              favComics={favComics}
              favCharacters={favCharacters}
              updateFavoris={updateFavoris}
            />
          </Route>
          <Route path="/logIn">
            <LogIn setUser={setUser} />
          </Route>
          <Route path="/signUp">
            <SignUp setUser={setUser} />
          </Route>
          <Route path="/">
            <Characters
              data={dataCharacters}
              setData={setDataCharacters}
              skip={skipCharacters}
              setSkip={setSkipCharacters}
              limit={limit}
              setLimit={setLimit}
              name={name}
              setName={setName}
              setCharacterDetails={setCharacterDetails}
              handleSubmit={handleSubmitMarvel}
              updateCharacterInFavoris={updateFavoris}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
