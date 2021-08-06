import axios from "axios";
import { useState, useEffect } from "react";
import ComicCard from "../../components/ComicCard";

function Comics({ data, setData, skip, setSkip, limit, setLimit }) {
  const [title, setTitle] = useState("");
  // const [data, setData] = useState();
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
  }, []);

  return isLoading ? (
    <div>pipi</div>
  ) : (
    <>
      {data.results &&
        data.results.map((comic, index) => (
          <ComicCard key={comic._id} comic={comic} index={index} />
        ))}
    </>
  );
}

export default Comics;
