import { create } from "zustand";

const useRatingStore = create((set) => ({
  rating: 0,
  tempRating: 0,

  setRating: (newRating) => set(() => ({ rating: newRating })),
  setTempRating: (newTempRating) => set(() => ({ tempRating: newTempRating })),
}));

export default useRatingStore;
