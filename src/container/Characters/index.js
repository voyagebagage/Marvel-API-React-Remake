import "./index.css";
import MarvelCard from "../../components/MarvelCard";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

import axios from "axios";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        //_____here we load favorites if there are any ___________
        let parseStorage = JSON.parse(localStorage.getItem("favMarvels"));
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
            `https://marvel-api-node-oliv-dev.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}`
          );
          setData(response.data.results);
          setIsLoading(false);
        }
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
        data={data}
        setData={setData}
        updateCharacterInFavoris={updateCharacterInFavoris}
        setCharacterDetails={setCharacterDetails}
      />
    </>
  ) : (
    <span>LoADING</span>
  );
}

export default Characters;
