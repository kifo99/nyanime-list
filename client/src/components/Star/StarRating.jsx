import PropTypes from "prop-types";

import { Star } from "lucide-react";

import useRatingStore from "../../features/activity/useActivityStore.js";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

export default function StarRating({
  maxRating = 5,
  color = "#FFBF00",
  size = 1,
  className = "",
  defaultRating = 0,
  onChangeValue,
}) {
  const { rating, tempRating, setRating, setTempRating } = useRatingStore();

  function handleRating(rating) {
    setRating(rating);
    setTempRating(0);
    onChangeValue("rating", rating);
  }
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <StarFunc
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            key={i}
          />
        ))}
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function StarFunc({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? <Star stroke={color} fill={color} /> : <Star stroke={color} />}
    </span>
  );
}

StarRating.propTypes = {
  maxRating: PropTypes.number,
  size: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  onChangeValue: PropTypes.func,
};
