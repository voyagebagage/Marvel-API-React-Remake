import { useState } from "react";
import { Link } from "react-router-dom";

import ComicCard from "../../components/ComicCard";
import MarvelCard from "../../components/MarvelCard";

function Favorites({ favComics, favCharacters, updateFavoris, token }) {
  const [toggleCharCom, setToggleCharCom] = useState(false);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h3 style={{ flex: 1 }} onClick={() => setToggleCharCom(false)}>
          Characters
        </h3>
        <h3 style={{ flex: 1 }} onClick={() => setToggleCharCom(true)}>
          Comics
        </h3>
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
