import "./index.css";
import axios from "axios";
import { useState, useEffect } from "react";

import ComicCard from "../../components/ComicCard";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

function Comics({
  data,
  setData,
  skip,
  setSkip,
  limit,
  setLimit,
  title,
  setTitle,
  handleSubmit,
  updateComicInFavoris,
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //_____here we load favorites if there are any ___________
        let parseStorage = JSON.parse(localStorage.getItem("favComics"));
        if (parseStorage && parseStorage.length !== 0) {
          data.forEach((elemData) => {
            parseStorage.forEach((eParseStorage) => {
              if (elemData._id === eParseStorage._id) {
                data.splice(data.indexOf(elemData), 1, eParseStorage);
              }
            });
          });
          setData(data);
          setIsLoading(false);
          //______otherwise we do the request_______________
        } else {
          const response = await axios.get(
            `https://marvel-api-node-oliv-dev.herokuapp.com/comics?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}&title=${title}`
          );
          setData(response.data.results);
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [skip, data, limit, setData, title]);

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className="comics-page">
      <Search
        handleSubmit={handleSubmit}
        value={title}
        setSearch={setTitle}
        placeholder={"Looking for a Comic?"}
        setLimit={setLimit}
      />
      <Pagination skip={skip} setSkip={setSkip} limit={limit} />
      <ComicCard
        data={data}
        setData={setData}
        updateComicInFavoris={updateComicInFavoris}
      />
    </div>
  );
}

export default Comics;
