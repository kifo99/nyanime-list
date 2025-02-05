import { useEffect } from "react";
import axios from "axios";

export default function AvatarPicker() {
  const name = "gambit";
  useEffect(function () {
    async function fetchData() {
      const data = await axios.get(
        `http://localhost:8080/anime/avatar/${name}`
      );

      console.log(data);
    }

    fetchData();
  });
  return <h1>Neko cats</h1>;
}
