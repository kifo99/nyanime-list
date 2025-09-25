import { useEffect } from "react";
import { socket } from "../../lib/socket";
import ConversationView from "../../components/Inbox/ConversationView";
import ConversationList from "../../components/Inbox/ConversationList";
import MessageInput from "../../components/Inbox/MessageInput";
import useAuthStore from "../../features/auth/useAuthStore";
import useMessageStore from "../../features/message/useMessageStore";
import { useUser, useUsers } from "../../features/queries/user/useUserQueries";
import {
  useChatRoomList,
  useChatRoom,
  useChat,
} from "../../features/queries/message/useMessageQuery";
import { useFriendsList } from "../../features/queries/friendship/useFriendshipQuery";
import { useState } from "react";

export default function Inbox() {
  const { userId } = useAuthStore();

  const [text, setText] = useState("");

  const { messages, _friend, chatRoomId, setMessages } = useMessageStore();
  const {
    data: chatRoomList,
    chatRoomListIsLoading,
    refetch: refetchChatRooms,
  } = useChatRoomList(userId, {
    enabled: !!userId,
  });

  const { data: friendList, friendListIsLoading } = useFriendsList(userId, {
    enabled: !!userId,
  });
  const { data: chat, chatIsLoading } = useChat(chatRoomId, {
    enabled: !!chatRoomId,
  });

  const { data: user, userIsLoading } = useUser(userId, { enabled: userId });

  const chatIds = chatRoomList?.map((chatRoom) => chatRoom._id) ?? [];
  const chatQueries = useChatRoom(chatIds, { enabled: !!chatIds }) ?? [];

  const friendIds = friendList?.map((friend) => friend);
  const userQueries = useUsers(friendIds, { enabled: !!friendIds });

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
  }, [setMessages]);

  if (
    !userId ||
    chatIsLoading ||
    chatRoomListIsLoading ||
    friendListIsLoading ||
    userIsLoading
  ) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full h-full p-2 box-border">
      <div className="w-full h-full grid grid-cols-[30%_70%] gap-2 min-h-0 p-2">
        <div className="border-2 border-purple-400 rounded-2xl overflow-hidden">
          <ConversationList
            user={user}
            chatRoomList={chatRoomList}
            friendList={friendList}
            chatQueries={chatQueries}
            userQueries={userQueries}
            onRefetch={refetchChatRooms}
          />
        </div>
        {chatRoomId ? (
          <div className="flex flex-col border-2 border-purple-400 rounded-2xl h-screen min-w-0">
            <div className="flex-1 min-h-0 flex flex-col">
              <ConversationView />
            </div>
            <div className="border-t border-purple-400 p-2">
              <MessageInput
                text={text}
                onSetText={setText}
                onHandleSendMessage={handleSendMessage}
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 min-h-0 flex items-center justify-center">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
