import ComicCard from "../../components/ComicCard";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ComicsPerMarvel({ updateFavoris, characterDetails }) {
  const [data, setData] = useState([]);
  const params = useParams();
  const id = params.characterId;

  const { name, thumbnail, description } = characterDetails;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-api-node-oliv-dev.herokuapp.com/comics/${id}`
        );
        setData(response.data.comics);
        console.log(response.data.comics);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <p>{name}</p>
      <img
        // id="marvelPic"
        src={`${thumbnail.path}.${thumbnail.extension}`}
        alt=""
      />
      <p>{description}</p>
      <ComicCard data={data} updateComicInFavoris={updateFavoris} />
    </>
  );
}

export default ComicsPerMarvel;
