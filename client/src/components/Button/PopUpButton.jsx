import PropTypes from "prop-types";

export default function PopUpButton({ onClick, className = "", children }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

PopUpButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};
