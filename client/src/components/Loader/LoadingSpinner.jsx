import PropTypes from "prop-types";

export default function LoadingSpinner({ message }) {
  return (
    <div className="flex justify-center items-center ">
      <h1>{message}</h1>
      <img src="/assets/gifs/Pulse.gif" alt="loading" className="w-24 h-24" />
    </div>
  );
}

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};
