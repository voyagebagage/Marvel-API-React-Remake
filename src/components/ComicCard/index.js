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
      updateComicInFavoris(comic, "comic");
    }
  };
  return (
    <div>
      {data &&
        data.map((comic, index) => (
          <div className="comicCard" key={comic._id}>
            <p>{index + 1}</p>
            <img
              id="comicPic"
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={"comic"}
            />
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="title">{comic.title}</p>
                <FontAwesomeIcon
                  icon="star"
                  style={
                    comic.active
                      ? {
                          color: "gold",
                          height: 20,
                          width: 20,
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
