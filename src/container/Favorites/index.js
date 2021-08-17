import { useState } from "react";
import { Link } from "react-router-dom";

import "./index.css";

import ComicCard from "../../components/ComicCard";
import MarvelCard from "../../components/MarvelCard";

function Favorites({ favComics, favCharacters, updateFavoris, token }) {
  const [toggleCharCom, setToggleCharCom] = useState(false);
  return (
    <>
      <div
        style={{ position: "absolute", top: 80 }}
        className="toggleWrapper wrapper"
      >
        <h3 onClick={() => setToggleCharCom(false)}>Characters</h3>
        <h3 onClick={() => setToggleCharCom(true)}>Comics</h3>
      </div>
      <div
        style={{ position: "absolute", top: 160 }}
        className={
          !toggleCharCom ? "character-page wrapper" : "comics-page wrapper"
        }
      >
        {token ? (
          !toggleCharCom ? (
            favCharacters.length ? (
              <MarvelCard
                data={favCharacters}
                updateCharacterInFavoris={updateFavoris}
              />
            ) : (
              <ComicCard
                data={favComics}
                updateComicInFavoris={updateFavoris}
              />
            )
          ) : (
            <ComicCard data={favComics} updateComicInFavoris={updateFavoris} />
          )
        ) : (
          <p>
            to see your favorites{" "}
            <Link className="link-text" to="/logIn">
              Log-In
            </Link>
          </p>
        )}
      </div>
    </>
  );
}

export default Favorites;
