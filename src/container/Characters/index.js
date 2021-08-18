import "./index.css";
import React, { useState, useEffect } from "react";
import MarvelCard from "../../components/MarvelCard";
import Search from "../../components/Search";
import PaginationLeft from "../../components/PaginationLeft";
import PaginationRight from "../../components/PaginationRight";
import { isThereFavInTheBrowser } from "../../Lib";

import axios from "axios";

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
  updateCharacterInFavoris,
  setCharacterDetails,
}) {
  const [isLoading, setIsLoading] = useState(true);
  // const [counter, setCounter] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-api-node-oliv-dev.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}`
        );

        //_____here we load favorites if there are any  & setData___________
        isThereFavInTheBrowser(response.data.results, setData);
        //_____for later to make an animated intro___________
        // const timer = setTimeout(() => {
        setIsLoading(false);
        // }, 100000);
        // return () => clearTimeout(timer);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [skip, limit]);

  return !isLoading ? (
    <div
      style={{ position: "absolute", top: "12%" }}
      className="character-page"
    >
      <Search
        handleSubmit={handleSubmit}
        value={name}
        setSearch={setName}
        placeholder={"Looking for a Marvel?"}
        setLimit={setLimit}
      />
      <div className="pagination">
        <PaginationLeft skip={skip} setSkip={setSkip} limit={limit} />
        <MarvelCard
          data={data}
          setData={setData}
          updateCharacterInFavoris={updateCharacterInFavoris}
          setCharacterDetails={setCharacterDetails}
        />
        <PaginationRight skip={skip} setSkip={setSkip} limit={limit} />
      </div>
    </div>
  ) : (
    <span>LoADING</span>
  );
}

export default Characters;
