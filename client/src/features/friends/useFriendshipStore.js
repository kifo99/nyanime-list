import { create } from "zustand";

const useFriendshipStore = create((set) => ({
  isOpened: false,

  setIsOpened: (isOpened) => set(() => ({ isOpened: isOpened })),
}));

export default useFriendshipStore;
