import { io } from "socket.io-client";
import axios from "axios";
import PropTypes from "prop-types";

import useAuthStore from "../../features/auth/useAuthStore";

import useMessageStore from "../../features/message/useMessageStore";

import InitialAvatar from "../Avatar/InitialAvatar";
import ConversationListItem from "./ConversationListItem";

const socket = io("http://localhost:8080");

export default function ConversationList({
  user,
  chatRoomList,
  friendList,
  chatQueries,
  userQueries,
}) {
  const { userId } = useAuthStore();
  const { setChatRoomId, setMessages, setFriendId, setFriend } =
    useMessageStore();

  async function fetchMessages(chatId, before = Date.now(), limit = 20) {
    const { data } = await axios.get(
      `http://localhost:8080/chat/chatRoom/${chatId}/messages`,
      { params: { before, limit } }
    );

    return data.messages;
  }

  async function handleOpenChat(chatId, friend) {
    let _chatId;
    let _messages = [];
    setFriendId(friend._id);
    setFriend(friend);

    if (!chatId) {
      const members = [
        {
          id: user._id,
          name: user.name,
          avatar: user.avatar,
        },
        {
          id: friend._id,
          name: friend.name,
          avatar: friend.name,
        },
      ];
      socket.emit(
        "startChat",
        { members, name: "", isGroup: false, sentAt: Date.now() },
        (response) => {
          if (response.success) {
            _chatId = response.chatRoom._id;
          }
        }
      );

      _messages = await fetchMessages(_chatId);
    }
    setChatRoomId(chatId);

    _messages = await fetchMessages(chatId || _chatId);
    setMessages(_messages);

    socket.emit("joinChat", chatId || _chatId);
  }

  return (
    <div className="w-full h-full">
      {chatRoomList?.length > 0 &&
        friendList?.length > 0 &&
        chatQueries?.length > 0 &&
        userQueries?.length > 0 && (
          <div>
            <div>
              <h1 className="text-xl font-semibold mb-4 text-center text-purple-700">
                Messages
              </h1>
              <ul className="overflow-y-auto flex-1 space-y-2">
                {chatRoomList.map((item, i) => {
                  const chat = chatQueries[i]?.data;

                  if (!chat) {
                    return <li key={`${item._id}-loading`}>Loading</li>;
                  }

                  const friend = chat.members.filter(
                    (member) => member.id !== userId
                  );

                  if (!friend) {
                    return <li key={`${item._id}-loading`}>Loading</li>;
                  }

                  return (
                    <ConversationListItem
                      key={item._id}
                      item={item}
                      chat={chat}
                      friend={friend}
                      onHandleOpenChat={handleOpenChat}
                    />
                  );
                })}
              </ul>
            </div>

            <div>
              <h1 className="text-xl font-semibold mb-4 text-center text-purple-700">
                Friends you can message
              </h1>
              <ul className="overflow-y-auto flex-1 space-y-2">
                {friendList.map((item, i) => {
                  console.log(userQueries[i].data);

                  const friend = userQueries[i]?.data;

                  if (!friend) {
                    return null;
                  }

                  const chats = chatQueries.map((chat) => {
                    return chat?.data;
                  });

                  const allMembers = chats.flatMap((chat) => chat.members);

                  const hasChat = allMembers.some((member) => {
                    return member.id === friend._id;
                  });

                  if (hasChat === true) {
                    return;
                  }

                  return (
                    <li
                      key={item._id}
                      className="grid grid-cols-[30%_70%] items-center bg-purple-200 hover:bg-purple-400  transition rounded-xl p-2 shadow-sm border border-purple-400 text-purple-700 cursor-pointer"
                      onClick={() => handleOpenChat(null, friend)}
                    >
                      <InitialAvatar userId={friend._id} />
                      <span>{friend.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
    </div>
  );
}

ConversationList.propTypes = {
  user: PropTypes.object,
  chatRoomList: PropTypes.array,
  friendList: PropTypes.array,
  chatQueries: PropTypes.array,
  userQueries: PropTypes.array,
};
