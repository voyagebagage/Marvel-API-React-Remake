import ComicCard from "../../components/ComicCard";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ComicsPerMarvel({ saveComicInFavoris, saveCharacterDetails }) {
  const [data, setData] = useState([]);
  const params = useParams();
  const id = params.characterId;

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
  console.log(data);
  return (
    <>
      <p>{saveCharacterDetails.name}</p>
      <ComicCard data={data} saveComicInFavoris={saveComicInFavoris} />
    </>
  );
}

export default ComicsPerMarvel;
