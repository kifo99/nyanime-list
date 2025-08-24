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
import { useEffect, useState } from "react";

const socket = io("http://localhost:8080");

export default function ChatPopup() {
  const [text, setText] = useState("");
  const {
    chatIsOpen,
    hasMore,
    friendId,
    _friend,
    messages,
    chatRoomId,
    setHasMore,
    setFriendId,
    setFriend,
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

  async function _getMessages(chatId, before = Date.now(), limit = 20) {
    const { data } = await axios.get(
      `http://localhost:8080/chat/chatRoom/${chatId}/messages`,
      { params: { before, limit } }
    );

    return data.messages;
  }
  async function loadOlderMessages(chatId) {
    if (!hasMore && messages.length === 0) return;

    const oldestMessage = messages.at(0).sentAt;
    const olderMessages = await _getMessages(chatId, oldestMessage, 6);

    if (olderMessages.length === 0) setHasMore(false);
    else setMessages((prev) => [...olderMessages, ...prev]);
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

      _messages = await _getMessages(_chatId);
    }
    setChatRoomId(chatId);

    _messages = await _getMessages(chatId || _chatId);
    setMessages(_messages);

    socket.emit("joinChat", chatId || _chatId);
  }

  function handleSendMessage(e) {
    e.preventDefault();

    if (!chatRoomId || !chat || !user || !_friend) return;

    socket.emit("message", {
      chatRoomId: chatRoomId,
      members: [
        {
          id: _friend._id,
          name: _friend.name,
          avatar: _friend.avatar,
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

    setText("");
  }

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [messages, setMessages]);

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
              }
            </div>
            <div className="h-full grid grid-rows-[80%_20%] px-6">
              {console.log(messages)}
              {messages.length > 0 ? (
                <div
                  className="border-2 border-purple-400 rounded-2xl p-4 flex flex-col gap-2 overflow-y-auto bg-purple-50"
                  onScroll={(e) => {
                    if (e.target.scrollTop === 0) {
                      loadOlderMessages(chatRoomId);
                    }
                  }}
                >
                  {messages
                    .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
                    .map((message) => {
                      if (message.senderId !== userId)
                        return (
                          <div
                            key={message._id}
                            className="self-start bg-purple-300 rounded-xl px-4 py-2 max-w-[75%] shadow"
                          >
                            <p>{message.message}</p>
                          </div>
                        );
                      else
                        return (
                          <div
                            key={message._id}
                            className="self-end bg-purple-200 rounded-xl px-4 py-2 max-w-[75%] shadow"
                          >
                            <p>{message.message}</p>
                          </div>
                        );
                    })}
                </div>
              ) : (
                <div></div>
              )}
              {chatRoomId ? (
                <form
                  className="w-full pt-2"
                  onSubmit={(e) => handleSendMessage(e)}
                >
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full border-2 border-purple-400 rounded-2xl bg-purple-50 p-3 focus:outline-none focus:ring-2 focus:ring-purple-300 text-purple-400 font-bold"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </form>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
