import PropTypes from "prop-types";

import InitialAvatar from "../Avatar/InitialAvatar";

export default function ConversationListItem({
  item,
  chat,
  friend,
  onHandleOpenChat,
}) {
  return (
    <li
      key={item._id}
      className="grid grid-cols-[20%_80%] items-center bg-purple-200 hover:bg-purple-400 
             transition rounded-lg p-1.5 shadow-sm border border-purple-400 
             text-purple-700 cursor-pointer text-sm"
      onClick={() => onHandleOpenChat(chat._id, friend[0].id)}
    >
      <InitialAvatar userId={friend[0].id} />
      <span className="truncate">{friend[0].name}</span>
    </li>
  );
}

ConversationListItem.propTypes = {
  item: PropTypes.object,
  chat: PropTypes.object,
  friend: PropTypes.array,
  onHandleOpenChat: PropTypes.func,
};
