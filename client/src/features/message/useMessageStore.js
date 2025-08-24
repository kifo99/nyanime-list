import { create } from "zustand";

const useMessageStore = create((set) => ({
  chatIsOpen: false,
  hasMore: true,
  friendId: "",
  _friend: {},
  messages: [],
  chatRoomId: "",

  setChatIsOpen: (chatIsOpen) => set(() => ({ chatIsOpen: chatIsOpen })),
  setHasMore: (hasMore) => set(() => ({ hasMore: hasMore })),
  setFriendId: (friendId) => set(() => ({ friendId: friendId })),
  setFriend: (friend) => set(() => ({ friend: friend })),
  setMessages: (messagesOrUpdater) =>
    set((state) => ({
      messages:
        typeof messagesOrUpdater === "function"
          ? messagesOrUpdater(state.messages)
          : messagesOrUpdater,
    })),
  setChatRoomId: (chatRoomId) => set(() => ({ chatRoomId: chatRoomId })),
}));

export default useMessageStore;
