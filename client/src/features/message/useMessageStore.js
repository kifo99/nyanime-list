import { create } from "zustand";

const useMessageStore = create((set) => ({
  chatIsOpen: false,
  friendId: "",
  _friend: {},
  messages: [],
  chatRoomId: "",

  setChatIsOpen: (chatIsOpen) => set(() => ({ chatIsOpen: chatIsOpen })),
  setFriendId: (friendId) => set(() => ({ friendId: friendId })),
  setFriend: (friend) => set(() => ({ friend: friend })),
  setMessages: (messages) => set(() => ({ messages: messages })),
  setChatRoomId: (chatRoomId) => set(() => ({ chatRoomId: chatRoomId })),
}));

export default useMessageStore;
