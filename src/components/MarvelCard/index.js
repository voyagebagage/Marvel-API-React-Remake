import "./index.css";
import { Link } from "react-router-dom";

export default function MarvelCard({
  data,
  saveCharacterInFavoris,
  setSaveCharacterDetails,
}) {
  return (
    <div className="character-page wrapper">
      {data.map((oneMarvel) => {
        const { name, thumbnail, description } = oneMarvel;
        return (
          <div className="marvelCard">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>{name}</p>
              <input
                type="button"
                value="STAR"
                onClick={() => saveCharacterInFavoris(oneMarvel, "character")}
              />
            </div>
            <Link
              key={oneMarvel._id}
              to={`/comics/${oneMarvel._id}`}
              className="noDecoration"
              onClick={() => setSaveCharacterDetails(oneMarvel)}
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
