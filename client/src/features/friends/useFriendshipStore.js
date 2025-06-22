import { create } from "zustand";

const useFriendshipStore = create((set) => ({
  isOpened: false,
  requestListIsOpened: false,

  setIsOpened: (isOpened) => set(() => ({ isOpened: isOpened })),
  setRequestListIsOpened: (requestListIsOpened) =>
    set(() => ({ requestListIsOpened: requestListIsOpened })),
}));

export default useFriendshipStore;
