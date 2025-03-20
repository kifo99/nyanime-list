import PropTypes from "prop-types";
import { useState, useRef } from "react";

import LeftIcon from "../../assets/icons/arrows/leftarrow.svg";
import RightIcon from "../../assets/icons/arrows/rightarrow.svg";

export default function List({ title, anime, children }) {
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainer = useRef(null);
  const scrollAmount = 1200;

  console.log(anime);
  console.log(!scrollContainer.current);

  const handleScrolling = (direction) => {
    console.log(anime.length);

    if (!scrollContainer.current || anime.length === 0) return;

    const container = scrollContainer.current;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    if (direction === "left") {
      if (container.scrollLeft <= 0) {
        container.scrollLeft = scrollWidth - clientWidth;
      } else {
        container.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    } else {
      if (container.scrollLeft + clientWidth >= scrollWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-col justify-center items-center relative"
    >
      <div className="flex justify-center items-center m-4">
        <h1 className="text-3xl text-center font-bold text-gray-800">
          {title}
        </h1>
      </div>
      {isHovered && (
        <>
          <button
            onClick={() => handleScrolling("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-400 opacity-40 p-5 text-white  rounded-full shadow-md hover:bg-amber-400 hover:opacity-100 z-10 flex items-center justify-center"
          >
            <img
              width={35}
              height={35}
              src={LeftIcon}
              alt="svg left arrow icon"
            />
          </button>

          <button
            onClick={() => handleScrolling("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2  bg-amber-400 opacity-40 p-5 text-white  rounded-full shadow-md hover:bg-amber-400 hover:opacity-100 z-10 flex items-center justify-center"
          >
            <img
              width={35}
              height={35}
              src={RightIcon}
              alt="svg right arrow icon"
            />
          </button>
        </>
      )}

      <div
        ref={scrollContainer}
        className="flex flex-row justify-between overflow-x-auto scroll-smooth scrollbar-hide relative"
      >
        {children}
      </div>
    </div>
  );
}

List.propTypes = {
  title: PropTypes.string,
  anime: PropTypes.array,
  children: PropTypes.node,
};
