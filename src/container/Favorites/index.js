import { useEffect, useState } from "react";

import ComicCard from "../../components/ComicCard";
import MarvelCard from "../../components/MarvelCard";

function Favorites({ favComics, favCharacters }) {
  const [isLoading, setIsLoading] = useState(true);
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
      {!toggleCharCom ? (
        <MarvelCard data={favCharacters} />
      ) : (
        <ComicCard data={favComics} />
      )}
    </div>
  );
}

export default Favorites;
