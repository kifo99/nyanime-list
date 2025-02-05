import { useEffect, useState } from "react";
import axios from "axios";

export default function AvatarPicker() {
  const [svg, setSvg] = useState("");
  const name = "gambit";
  useEffect(
    function () {
      async function fetchData() {
        const { data } = await axios.get(
          `http://localhost:8080/anime/avatar/${name}`
        );

        setSvg(data.svg);
      }

      fetchData();
    },
    [name]
  );
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
}
