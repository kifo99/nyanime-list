import { create } from "zustand";

const useMessageStore = create((set) => ({
  chatIsOpen: false,
  friendId: "",
  messages: [],
  chatRoomId: "",

  setChatIsOpen: (chatIsOpen) => set(() => ({ chatIsOpen: chatIsOpen })),
  setFriendId: (friendId) => set(() => ({ friendId: friendId })),
  setMessages: (messages) => set(() => ({ messages: messages })),
  setChatRoomId: (chatRoomId) => set(() => ({ chatRoomId: chatRoomId })),
}));

export default useMessageStore;
