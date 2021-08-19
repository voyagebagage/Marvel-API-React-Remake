import "./index.css";

import ComicCard from "../../components/ComicCard";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ComicsPerMarvel({ updateFavoris, characterDetails }) {
  const [data, setData] = useState([]);
  const params = useParams();
  const id = params.characterId;
  // const [id, setId] = useState(params.characterId);
  const { name, thumbnail, description } = characterDetails;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-api-node-oliv-dev.herokuapp.com/comics/${id}`
        );
        setData(response.data.comics);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="comicsPerMarvel-wrapper">
      <div className="comics-per-marvel-page wrapper">
        <div className="characterDetails">
          <h3 className="marvelName">{name}</h3>
          <img
            id="marvelPicDescription"
            src={`${thumbnail.path}.${thumbnail.extension}`}
            alt=""
          />
          <p>{description}</p>
        </div>

        <ComicCard data={data} updateComicInFavoris={updateFavoris} />
      </div>
    </div>
  );
}

export default ComicsPerMarvel;
