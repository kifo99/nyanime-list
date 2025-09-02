import PropTypes from "prop-types";

export default function MessageInput({ text, onSetText, onHandleSendMessage }) {
  return (
    <form className="w-full pt-2" onSubmit={(e) => onHandleSendMessage(e)}>
      <input
        type="text"
        placeholder="Type your message..."
        className="w-full border-2 border-purple-400 rounded-2xl bg-purple-50 p-3 focus:outline-none focus:ring-2 focus:ring-purple-300 text-purple-400 font-bold"
        value={text}
        onChange={(e) => onSetText(e.target.value)}
      />
    </form>
  );
}

MessageInput.propTypes = {
  text: PropTypes.string,
  onSetText: PropTypes.func,
  onHandleSendMessage: PropTypes.func,
};
