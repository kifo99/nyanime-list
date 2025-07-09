import { create } from "zustand";

const useMessageStore = create((set) => ({
  chatIsOpen: false,

  setChatIsOpen: (chatIsOpen) => set(() => ({ chatIsOpen: chatIsOpen })),
}));

export default useMessageStore;
