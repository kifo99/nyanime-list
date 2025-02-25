import PropTypes from "prop-types";

export default function InitialAvatar({ avatar }) {
  return (
    <div
      className="flex justify-center items-center w-8 h-8 rounded-full overflow-hidden"
      dangerouslySetInnerHTML={{ __html: avatar }}
    />
  );
}

InitialAvatar.propTypes = {
  avatar: PropTypes.string,
};
