import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { io } from "socket.io-client";
import useMessageStore from "../../features/message/useMessageStore";

import useAuthStore from "../../features/auth/useAuthStore";
import { useUser, useUsers } from "../../features/queries/user/useUserQueries";
import { useFriendsList } from "../../features/queries/friendship/useFriendshipQuery";

import InitialAvatar from "../Avatar/InitialAvatar";

import {
  useChatRoomList,
  useChat,
  useChatRoom,
} from "../../features/queries/message/useMessageQuery";
import { useState } from "react";

const socket = io("http://localhost:8080");

export default function ChatPopup() {
  const [text, setText] = useState("");
  const {
    chatIsOpen,
    friendId,
    messages,
    chatRoomId,
    setFriendId,
    setMessages,
    setChatRoomId,
  } = useMessageStore();
  const { userId } = useAuthStore();
  const { data: chatRoomList, chatRoomListIsLoading } = useChatRoomList(
    userId,
    {
      enabled: !!userId,
    }
  );

  const { data: chat, chatIsLoading } = useChat(chatRoomId, {
    enabled: !!chatRoomId,
  });
  const { data: friend, friendIsLoading } = useUser(friendId, {
    enabled: !!friendId,
  });

  const { data: friendList, friendListIsLoading } = useFriendsList(userId, {
    enabled: !!userId,
  });

  const { data: user, userIsLoading } = useUser(userId, { enabled: userId });

  const chatIds = chatRoomList?.map((chatRoom) => chatRoom._id);
  const chatQueries = useChatRoom(chatIds);

  const friendIds = friendList?.map((friend) => friend);
  const userQueries = useUsers(friendIds);

  async function handleOpenChat(chatId, friendId) {
    if (!chatId) {
      console.log("Chat is'nt started");
    }
    setChatRoomId(chatId);
    setFriendId(friendId);
    const { data } = await axios.get(
      `http://localhost:8080/chat/chatRoom/${chatId}/messages`
    );

    socket.emit("joinChat", chatId);
    console.log(data);
  }
  function handleSendMessage(e) {
    e.preventDefault();
    if (!chat) {
      alert("Start chat first");
      return;
    }
    if (!user || !friend) {
      console.log("Missing user and friend");
      return;
    }
    socket.emit("message", {
      members: [
        {
          id: friend._id,
          name: friend.name,
          avatar: friend.avatar,
        },
        {
          id: user._id,
          name: user.name,
          avatar: user.avatar,
        },
      ],
      sender: userId,
      message: text,
      sentAt: Date.now(),
    });
  }

  if (chatRoomListIsLoading) {
    return <div>Loading</div>;
  }
  if (chatIsLoading) {
    return <div>Loading</div>;
  }
  if (friendIsLoading || userIsLoading) {
    return <div>Loading</div>;
  }
  if (friendListIsLoading || userIsLoading) {
    return <div>Loading</div>;
  }
  return (
    <AnimatePresence>
      {chatIsOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-2xl z-50 w-[70vw] max-w-[1000px] h-[80vh]"
        >
          <div className="h-full grid grid-cols-[3fr_7fr] gap-0">
            <div className="h-full flex flex-col border-2 border-purple-400 rounded-2xl p-4 bg-gray-50 overflow-hidden px-6">
              {/*Show messages if you have any */}
              {chatRoomList.length > 0 && (
                <div>
                  <h1 className="text-xl font-semibold mb-4 text-center text-purple-700">
                    Messages
                  </h1>
                  <ul className="overflow-y-auto flex-1 space-y-2">
                    {chatRoomList.map((item, i) => {
                      const chat = chatQueries[i]?.data;

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
              )}

              {/*Show suggested friend from friend list that can be messaged */}

              {
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

                      const members = chats.map((chat) => chat.members[0]);

                      console.log(members);

                      const hasChat = members.map((member) => {
                        // console.log(friend._id);
                        // console.log(member);

                        if (member._id === friend._id) return true;
                        return false;
                      });
                      // console.log(hasChat);

                      if (hasChat === true) {
                        return;
                      }

                      return (
                        <li
                          key={item}
                          className="grid grid-cols-[30%_70%] items-center bg-purple-200 hover:bg-purple-400  transition rounded-xl p-2 shadow-sm border border-purple-400 text-purple-700 cursor-pointer"
                          onClick={() => handleOpenChat(null, friend._id)}
                        >
                          <InitialAvatar userId={friend._id} />
                          <span>{friend.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              }
            </div>
            <div className="h-full grid grid-rows-[80%_20%] px-6">
              <div className="border-2 border-purple-400 rounded-2xl p-4 flex flex-col gap-2 overflow-y-auto bg-purple-50">
                <div className="self-start bg-purple-300 rounded-xl px-4 py-2 max-w-[75%] shadow">
                  <p>This is the friend message</p>
                </div>
                <div className="self-end bg-purple-200 rounded-xl px-4 py-2 max-w-[75%] shadow">
                  <p>This is your message</p>
                </div>
              </div>
              <form
                className="w-full pt-2"
                onSubmit={(e) => handleSendMessage(e)}
              >
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full border-2 border-purple-400 rounded-2xl bg-purple-50 p-3 focus:outline-none focus:ring-2 focus:ring-purple-300 text-purple-400 font-bold"
                  onChange={(e) => setText(e.target.value)}
                />
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
