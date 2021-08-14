import { useState } from "react";
import { Link } from "react-router-dom";

import "./index.css";

import ComicCard from "../../components/ComicCard";
import MarvelCard from "../../components/MarvelCard";

function Favorites({ favComics, favCharacters, updateFavoris, token }) {
  const [toggleCharCom, setToggleCharCom] = useState(false);
  return (
    <div>
      <div className="toggleWrapper">
        <h3 onClick={() => setToggleCharCom(false)}>Characters</h3>
        <h3 onClick={() => setToggleCharCom(true)}>Comics</h3>
      </div>

      {token ? (
        !toggleCharCom ? (
          favCharacters.length ? (
            <MarvelCard
              data={favCharacters}
              updateCharacterInFavoris={updateFavoris}
            />
          ) : (
            <ComicCard data={favComics} updateComicInFavoris={updateFavoris} />
          )
        ) : (
          <ComicCard data={favComics} updateComicInFavoris={updateFavoris} />
        )
      ) : (
        <p>
          to see your favorites <Link to="/logIn">Login</Link>
        </p>
      )}
    </div>
  );
}

export default Favorites;
