import "./index.css";
import MarvelCard from "../../components/MarvelCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Characters({ data, setData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-api-node-oliv-dev.herokuapp.com/characters?apiKey=${process.env.API_KEY}&limit=${limit}&skip=${skip}&title=${name}`
        );
        setData(response.data);
        // console.log(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return !isLoading ? (
    <div className="character-page wrapper">
      {data.results.map((oneMarvel, index) => (
        <Link
          className="marvelCard"
          key={oneMarvel._id}
          to={`/comics/${oneMarvel._id}`}
        >
          <MarvelCard oneMarvel={oneMarvel} />
        </Link>
      ))}
    </div>
  ) : (
    <span>LoADING</span>
  );
}

export default Characters;
