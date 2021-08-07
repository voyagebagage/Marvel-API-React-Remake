import "./index.css";
import MarvelCard from "../../components/MarvelCard";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");

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
  }, [skip]);

  return !isLoading ? (
    <>
      <Search
        handleSubmit={handleSubmit}
        value={name}
        setSearch={setName}
        placeholder={"Looking for a Marvel?"}
      />
      <Pagination skip={skip} setSkip={setSkip} limit={limit} />
      {console.log(skip)}
      <div className="character-page wrapper">
        {data.results.map((oneMarvel) => (
          <Link
            className="marvelCard"
            key={oneMarvel._id}
            to={`/comics/${oneMarvel._id}`}
          >
            <MarvelCard oneMarvel={oneMarvel} />
          </Link>
        ))}
      </div>
    </>
  ) : (
    <span>LoADING</span>
  );
}

export default Characters;
