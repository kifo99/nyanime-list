import { io } from "socket.io-client";
import axios from "axios";

import useAuthStore from "../../features/auth/useAuthStore";
import {
  useChatRoomList,
  useChatRoom,
} from "../../features/queries/message/useMessageQuery";
import useMessageStore from "../../features/message/useMessageStore";
import { useFriendsList } from "../../features/queries/friendship/useFriendshipQuery";
import { useUser, useUsers } from "../../features/queries/user/useUserQueries";

import InitialAvatar from "../Avatar/InitialAvatar";

const socket = io("http://localhost:8080");

export default function ConversationList({
  user,
  chat,
  chatRoomList,
  friendList,
}) {
  const { userId } = useAuthStore();
  const { setChatRoomId, setMessages, setFriendId, setFriend } =
    useMessageStore();

  const chatIds = chatRoomList?.map((chatRoom) => chatRoom._id) ?? [];
  const chatQueries = useChatRoom(chatIds, { enabled: !!chatIds }) ?? [];

  const friendIds = friendList?.map((friend) => friend);
  const userQueries = useUsers(friendIds, { enabled: !!friendIds });

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

  if (
    !userId ||
    chatRoomListIsLoading ||
    friendListIsLoading ||
    userIsLoading
  ) {
    return <div>Loading...</div>;
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
                  if (!chat) return null;

                  if (chat.isGroup === true) {
                    return (
                      <li
                        key={item._id}
                        className="bg-purple-200 hover:bg-purple-400  transition rounded-xl p-2 shadow-sm border border-purple-400 text-purple-700 cursor-pointer"
                      >
                        {chat.name}
                      </li>
                    );
                  }

                  const friend = chat.members.filter(
                    (member) => member.id !== userId
                  );

                  if (friend.length > 1) {
                    return friend.map((f) => (
                      <ul
                        key={item._id}
                        className="bg-purple-200 hover:bg-purple-400  transition rounded-xl p-2 shadow-sm border border-purple-400 text-purple-700 cursor-pointer"
                      >
                        <li>{f.name}</li>
                      </ul>
                    ));
                  }
                  return (
                    <li
                      key={item._id}
                      className="grid grid-cols-[30%_70%] items-center bg-purple-200 hover:bg-purple-400  transition rounded-xl p-2 shadow-sm border border-purple-400 text-purple-700 cursor-pointer"
                      onClick={() => handleOpenChat(chat._id, friend[0].id)}
                    >
                      <InitialAvatar userId={friend[0].id} />
                      <span>{friend[0].name}</span>
                    </li>
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
                  const friend = userQueries[i]?.data;

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
                      key={item}
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
