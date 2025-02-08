import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function AvatarPicker({ name }) {
  const [svg, setSvg] = useState("");
  useEffect(
    function () {
      const source = axios.CancelToken.source();
      async function fetchData() {
        const { data } = await axios.get(
          `http://localhost:8080/anime/avatar/${name}`,
          {
            cancelToken: source.cancel(),
          }
        );

        setSvg(data.svg);
      }

      fetchData();

      return () => {
        source.cancel("Component is unmounted, request canceled.");
      };
    },
    [name]
  );

  return (
    <div
      className="flex justify-center items-center w-24 h-24 rounded-full overflow-hidden"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

AvatarPicker.propTypes = {
  name: PropTypes.string,
};
