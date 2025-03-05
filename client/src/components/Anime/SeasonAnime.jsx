import { useEffect, useState } from "react";
import axios from "axios";

import SeasonAnimeCard from "./SeasonAnimeCard";

export default function SeasonAnime() {
  const [anime, setAnime] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = axios.get(``);
  //   };
  // });
  return (
    <div>
      <SeasonAnimeCard />
    </div>
  );
}
