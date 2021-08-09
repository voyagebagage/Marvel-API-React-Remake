import "./index.css";
import MarvelCard from "../../components/MarvelCard";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

import axios from "axios";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

function Characters({
  data,
  setData,
  skip,
  setSkip,
  limit,
  setLimit,
  name,
  setName,
  handleSubmit,
  saveCharacterInFavoris,
  setCharacterDetails,
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-api-node-oliv-dev.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}`
        );
        setData(response.data);
        // console.log(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [skip, limit]);

  return !isLoading ? (
    <>
      <Search
        handleSubmit={handleSubmit}
        value={name}
        setSearch={setName}
        placeholder={"Looking for a Marvel?"}
        setLimit={setLimit}
      />
      <Pagination skip={skip} setSkip={setSkip} limit={limit} />

      <MarvelCard
        data={data.results}
        saveCharacterInFavoris={saveCharacterInFavoris}
        setCharacterDetails={setCharacterDetails}
      />
    </>
  ) : (
    <span>LoADING</span>
  );
}

export default Characters;
