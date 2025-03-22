import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGenre = async function () {
      try {
        const { data } = await axios.get(`http://localhost:8080/anime/genres`, {
          signal: controller.signal,
        });

        if (!data) throw new Error("Failed to fetch data!");
        console.log(data);

        setGenres(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenre();

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;

  console.log(genres);

  return (
    <div>
      <div>
        {/* {genres.map((genre) => (
          <Link key={genre.id}>
            <p>{genre.name}</p>
          </Link>
        ))} */}
      </div>
    </div>
  );
}
