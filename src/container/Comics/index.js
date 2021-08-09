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
  saveComicInFavoris,
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-api-node-oliv-dev.herokuapp.com/comics?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}&title=${title}`
        );
        setData(response.data);
        console.log(data);

        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [skip]);

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
      <ComicCard data={data.results} saveComicInFavoris={saveComicInFavoris} />
    </div>
  );
}

export default Comics;
