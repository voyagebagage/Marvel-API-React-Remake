import "./index.css";
// import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ComicCard({ data, setData, updateComicInFavoris }) {
  const handleClickFavorite = (comic, index) => {
    if (comic.active) {
      comic.active = false;
      updateComicInFavoris(comic, "comic");
    } else {
      let newTab = [...data];
      newTab.forEach((elem) => (elem = { ...elem, active: false }));
      newTab[index].active = !newTab.active;
      setData(newTab);
      updateComicInFavoris(newTab[index], "comic");
    }
  };
  return (
    <div className="comic-card-component wrapper">
      {data &&
        data.map((comic, index) => (
          <div className="comicCard" key={comic._id}>
            <p className="number">{index + 1}</p>
            <img
              id="comicPic"
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={"comic"}
            />
            <div>
              <div className="card-text-container">
                <p className="title">{comic.title}</p>
                <FontAwesomeIcon
                  icon="star"
                  className="star"
                  style={
                    comic.active
                      ? {
                          color: "gold",
                          height: 30,
                          width: 30,
                        }
                      : { color: "lightgrey", height: 30, width: 30 }
                  }
                  onClick={() => handleClickFavorite(comic, index)}
                />
              </div>
              <p className="descrpition">{comic.description}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
