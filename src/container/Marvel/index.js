import ComicCard from "../../components/ComicCard";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Marvel() {
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
        console.log(data, "------------");
        // setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);
  return (
    <>
      {data &&
        data.map((comic, index) => (
          <ComicCard key={comic._id} comic={comic} index={index} />
        ))}
    </>
  );
}

export default Marvel;
