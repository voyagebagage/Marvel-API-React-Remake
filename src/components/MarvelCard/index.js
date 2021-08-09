import "./index.css";
import { Link } from "react-router-dom";

export default function MarvelCard({
  data,
  saveCharacterInFavoris,
  setCharacterDetails,
}) {
  return (
    <div className="character-page wrapper">
      {data.map((oneMarvel) => {
        const { name, thumbnail, description } = oneMarvel;
        return (
          <div className="marvelCard" key={oneMarvel._id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>{name}</p>
              <input
                type="button"
                value="STAR"
                onClick={() => saveCharacterInFavoris(oneMarvel, "character")}
              />
            </div>
            <Link
              to={`/comics/${oneMarvel._id}`}
              className="noDecoration"
              onClick={() => setCharacterDetails(oneMarvel)}
            >
              <img
                id="marvelPic"
                src={`${thumbnail.path}.${thumbnail.extension}`}
                alt=""
              />
              <p className="marvelDescription">{description}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
