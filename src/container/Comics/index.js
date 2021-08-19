import "./index.css";
import axios from "axios";
import { useState, useEffect } from "react";

import ComicCard from "../../components/ComicCard";
import Search from "../../components/Search";
import PaginationLeft from "../../components/PaginationLeft";
import PaginationRight from "../../components/PaginationRight";
import { isThereFavInTheBrowser } from "../../Lib";

function Comics({
  data,
  setData,
  setFavComics,
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
        const response = await axios.get(
          `https://marvel-api-node-oliv-dev.herokuapp.com/comics?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}&title=${title}`
        );
        //_____here we load favorites if there are any  & setData___________
        isThereFavInTheBrowser(
          response.data.results,
          setData,
          // setFavComics,
          "comics"
        );
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [skip, limit]);

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div
      style={{ position: "absolute", top: 80 }}
      className="comics-page wrapper"
    >
      <Search
        handleSubmit={handleSubmit}
        value={title}
        setSearch={setTitle}
        placeholder={"Looking for a Comic?"}
        setLimit={setLimit}
      />
      <div className="pagination">
        <PaginationLeft skip={skip} setSkip={setSkip} limit={limit} />
        <ComicCard
          data={data}
          setData={setData}
          updateComicInFavoris={updateComicInFavoris}
        />
        <PaginationRight skip={skip} setSkip={setSkip} limit={limit} />
      </div>
    </div>
  );
}

export default Comics;
