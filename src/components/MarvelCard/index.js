import "./index.css";

import { Link } from "react-router-dom";
// import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MarvelCard({
  data,
  setData,
  updateCharacterInFavoris,
  setCharacterDetails,
}) {
  const handleClickFavorite = (oneMarvel, index) => {
    if (oneMarvel.active) {
      oneMarvel.active = false;
      updateCharacterInFavoris(oneMarvel, "character");
    } else {
      let newTab = [...data];
      newTab.forEach((elem) => (elem = { ...elem, active: false }));
      newTab[index].active = !newTab.active;
      setData(newTab);
      updateCharacterInFavoris(newTab[index], "character");
    }
  };

  return (
    <div className="character-component wrapper">
      {data.map((oneMarvel, index) => {
        const { name, thumbnail, description } = oneMarvel;
        return (
          <div className="marvelCard" key={oneMarvel._id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>{name}</p>
              <FontAwesomeIcon
                className="star"
                icon="star"
                style={
                  oneMarvel.active
                    ? { color: "gold", height: 30, width: 30 }
                    : { color: "lightgrey", height: 30, width: 30 }
                }
                onClick={() => handleClickFavorite(oneMarvel, index)}
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
