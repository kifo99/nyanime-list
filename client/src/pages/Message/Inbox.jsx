import ConversationView from "../../components/Inbox/ConversationView";
import ConversationList from "../../components/Inbox/ConversationList";
import MessageInput from "../../components/Inbox/MessageInput";

import useAuthStore from "../../features/auth/useAuthStore";
import { useUser, useUsers } from "../../features/queries/user/useUserQueries";
import {
  useChatRoomList,
  useChatRoom,
} from "../../features/queries/message/useMessageQuery";
import { useFriendsList } from "../../features/queries/friendship/useFriendshipQuery";

export default function Inbox() {
  const { userId } = useAuthStore();
  const { data: chatRoomList, chatRoomListIsLoading } = useChatRoomList(
    userId,
    {
      enabled: !!userId,
    }
  );

  const { data: friendList, friendListIsLoading } = useFriendsList(userId, {
    enabled: !!userId,
  });

  const { data: user, userIsLoading } = useUser(userId, { enabled: userId });

  const chatIds = chatRoomList?.map((chatRoom) => chatRoom._id) ?? [];
  const chatQueries = useChatRoom(chatIds, { enabled: !!chatIds }) ?? [];

  const friendIds = friendList?.map((friend) => friend);
  const userQueries = useUsers(friendIds, { enabled: !!friendIds });

  if (
    !userId ||
    chatRoomListIsLoading ||
    friendListIsLoading ||
    userIsLoading
  ) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full h-full grid grid-cols-[30%_70%]">
      <div className="border-2 border-purple-400 rounded-2xl">
        <ConversationList
          user={user}
          chatRoomList={chatRoomList}
          friendList={friendList}
          chatQueries={chatQueries}
          userQueries={userQueries}
        />
      </div>
      <div>
        <div>
          <ConversationView />
        </div>
        <div>
          <MessageInput />
        </div>
      </div>
    </div>
  );
}
