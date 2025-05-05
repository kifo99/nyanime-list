import { create } from "zustand";

const useActivityStore = create((set) => ({
  rating: 0,
  tempRating: 0,
  like: false,

  setRating: (newRating) => set(() => ({ rating: newRating })),
  setTempRating: (newTempRating) => set(() => ({ tempRating: newTempRating })),
  setLike: (newStatus) => set(() => ({ like: newStatus })),
  reset: () => set(() => ({ rating: 0, tempRating: 0, like: false })),
}));

export default useActivityStore;
