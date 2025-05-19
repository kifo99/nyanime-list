import { create } from "zustand";

const useActivityStore = create((set) => ({
  rating: 0,
  tempRating: 0,
  like: false,
  listName: "",

  setRating: (newRating) => set(() => ({ rating: newRating })),
  setTempRating: (newTempRating) => set(() => ({ tempRating: newTempRating })),
  setLike: (newStatus) => set(() => ({ like: newStatus })),
  setListName: (newName) => set(() => ({ listName: newName })),
  reset: () => set(() => ({ rating: 0, tempRating: 0, like: false })),
  resetListName: () => set(() => ({ listName: "" })),
}));

export default useActivityStore;
